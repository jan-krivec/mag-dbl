import {EventEmitter, Injectable, OnDestroy, OnInit} from '@angular/core';
import {ethers} from 'ethers';
import {Identity, IdentitySDK} from "@onchain-id/identity-sdk";
import factoryJson from '../../contracts/ONCHAINID/factory/IdFactory.sol/IdFactory.json';
import trexFactoryJson from "../../contracts/TREX/factory/TREXFactory.sol/TREXFactory.json";
import {environment} from "../../environments/environment";
import {ClaimDTO, KeyDTO} from "../shared/identity.model";
import {IdentityComponent} from "../components/identity/identity.component";
import {ErrorHandlerService} from "../shared/error/error-handler.service";
import {Subject} from "rxjs";
const jsrsasign = require('jsrsasign');


declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class EthereumService implements OnInit, OnDestroy {
  web3: any;
  factory: any;

  private _writeProvider: ethers.providers.Web3Provider | undefined;
  private _readProvider: ethers.providers.JsonRpcProvider | undefined;
  identity: Identity | null = null;

  get writeProvider() {
    return this._writeProvider;
  }

  set writeProvider(val) {
    this._writeProvider = val;
  }

  get readProvider() {
    return this._readProvider;
  }

  private _account: string | null = null;

  get account() {
    return this._account;
  }

  set account(val) {
    if (val !== null) {
      this.writeProvider = new ethers.providers.Web3Provider(window.ethereum);
    }
    this._account = val;
    this.isConnected = val !== null;
    this.setIdentity();
  }

  async setIdentity() {
    if (this.isConnected) {
      const provider = this.readProvider;
      this.factory = new ethers.Contract(environment.idFactoryAdr, factoryJson.abi, this.readProvider.getSigner());

      const idAccount = await this.factory.getIdentity(this.account);
      this.identity = await Identity.at(idAccount, provider.getSigner());

    }
  }

  get onchainId() {
    if (this.isConnected) {
      return this.identity?.address;
    }
    return null;
  }

  //
  public isConnectedEvent = new Subject<boolean>();
  event$ = this.isConnectedEvent.asObservable();

  private _isConnected: boolean = false;

  get isConnected(): boolean {
    return this._isConnected;
  }

  //
  set isConnected(val: boolean) {
    this._isConnected = val;
    this.isConnectedEvent.next(val);
  }

  constructor(public errorHandlerService: ErrorHandlerService) {
    this._readProvider = new ethers.providers.JsonRpcProvider();
  }

  ngOnInit() {
    if (window.ethereum !== 'undefined') {
      window.ethereum.addListener('accountsChanged', this.handleAccountsChanged);
    }
  }

  ngOnDestroy() {
    window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
  }

  async checkMetaMask(): Promise<boolean> {
    return typeof window.ethereum !== 'undefined';
  }

  async requestAccountAccess(): Promise<string[]> {
    if (await this.checkMetaMask()) {
      try {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        if (accounts?.length > 0) {
          this.account = accounts[0]
        } else {
          this.account = null;
        }
        return accounts;
      } catch (error) {
        this.account = null;
        throw new Error('User denied account access');
      }
    } else {
      this.account = null;
      throw new Error('MetaMask is not installed');
    }
  }

  async checkIsConected(): Promise<boolean> {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({method: 'eth_accounts'});
      if (accounts.length > 0) {
        this.account = accounts[0];
        return true;
      }
    }
    this.account = null;
    return false;
  }

  handleAccountsChanged(accounts: Array<string>) {
    this.account = accounts?.length > 0 ? accounts[0] : null;
  }

  async addKey(onchainId: string, claimIssuerAddr: string, keyType: string) {
    const signer = this.writeProvider.getSigner();
    const identity = await Identity.at(onchainId, this.writeProvider.getSigner());
    const purpose = this.mapPurposeToKey(keyType);
    try {
      const addKeyTransaction = await identity.addKey(IdentitySDK.utils.encodeAndHash(['address'], [claimIssuerAddr]), purpose, IdentitySDK.utils.enums.KeyType.ECDSA, {signer});
      await addKeyTransaction.wait();

      console.log(`Add purpose ${keyType} on identity ${onchainId} to ${claimIssuerAddr} tx mined: ${addKeyTransaction.hash}`);
    } catch (error) {
      this.errorHandlerService.displayError(error.message);
    }
  }

  async removeKey(onchainId: string, claimIssuerAddr: string, keyType: string) {
    const signer = this.writeProvider.getSigner();
    const identity = await Identity.at(onchainId, this.writeProvider.getSigner());
    const purpose = this.mapPurposeToKey(keyType);
    try {
      const removeKeyTransaction = await identity.removeKey(IdentitySDK.utils.encodeAndHash(['address'], [claimIssuerAddr]), purpose, {signer});
      await removeKeyTransaction.wait();

      console.log(`Remove purpose ${keyType} on identity ${onchainId} to ${claimIssuerAddr} tx mined: ${removeKeyTransaction.hash}`);
    } catch (error) {
      this.errorHandlerService.displayError(error.message);
    }
  }

  async getKeyByPurpose(onchainId: string, keyPurpose: string) {

    try {

      const identity = await Identity.at(onchainId, this.readProvider.getSigner());

      let keys: any[] = [];

      let purposes = [];
      if (keyPurpose == null) {
        purposes = [IdentitySDK.utils.enums.KeyPurpose.MANAGEMENT, IdentitySDK.utils.enums.KeyPurpose.ACTION, IdentitySDK.utils.enums.KeyPurpose.CLAIM];
      } else {
        purposes = [this.mapPurposeToKey(keyPurpose)];
      }

      for (const p in purposes) {
        const purpose = purposes[p];
        const k = await identity.getKeysByPurpose(
          purpose
        );
        keys = keys.concat(k);
      }

      keys.map(k => {
        console.log(k)
      });
      return keys.map(k => {
        return new KeyDTO(k.key, this.mapKeyToType(k.type), [k.purposes.map(this.mapKeyToPurpose)])
      });
    } catch (error) {
      this.errorHandlerService.displayError(error.message);
      return [];
    }
  }

  async addClaim(onchainId: string, topic: number, data: string) {
    if (this.writeProvider != null) {
      try {
        const signer = this.writeProvider.getSigner();
        const identity = await Identity.at(onchainId, signer);


        // prepare the claim
        const claim = new IdentitySDK.Claim({
          address: onchainId,
          data: IdentitySDK.utils.toHex(data),
          issuer: environment.claimIssuer1OID,
          emissionDate: new Date(),
          scheme: 1,
          topic: topic,
          uri: ''
        });

        // sign the claim
        const customSigner = new IdentitySDK.SignerModule(signer);
        await claim.sign(customSigner);

        const tx = await identity.addClaim(claim.topic, claim.scheme, claim.issuer, claim.signature, claim.data, claim.uri, { signer });
        await tx.wait();

        console.log(`Added claim at tx hash ${tx.hash}`);

      } catch (error) {
        this.errorHandlerService.displayError(error.message);
      }
    }
  }

  async getClaimIdsByTopic(onchainId: string, topic: number) {
    const identity = new IdentitySDK.Identity(onchainId, this.writeProvider.getSigner());

    const claims = await identity.getClaimsByTopic(topic ? topic : 0);

    return claims.map(claim => {
      return new ClaimDTO(claim.id, claim.address, claim.topic, claim.issuer, claim.data, claim.signature, claim.uri);
    });
  }


  mapKeyToPurpose(val: number) {
    switch (val) {
      case 1:
        return 'MANAGEMENT';
      case 2:
        return 'ACTION';
      default:
        return 'CLAIM';
    }
  }

  mapPurposeToKey(keyPurpose: string) {
    switch (keyPurpose) {
      case 'MANAGEMENT':
        return IdentitySDK.utils.enums.KeyPurpose.MANAGEMENT;
        break;
      case 'ACTION':
        return IdentitySDK.utils.enums.KeyPurpose.ACTION;
        break;
      default:
        return IdentitySDK.utils.enums.KeyPurpose.CLAIM;
        break;
    }
  }

  mapKeyToType(val: number) {
    switch (val) {
      case 1:
        return 'ECDSA';
      default:
        return 'RSA';
    }
  }
}
