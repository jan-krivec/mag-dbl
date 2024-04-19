import {EventEmitter, Injectable, OnDestroy, OnInit} from '@angular/core';
import {ethers, Signer} from 'ethers';
import ONCHAINID from "@onchain-id/solidity";
import {Identity, IdentitySDK} from "@onchain-id/identity-sdk";
import factoryJson from '../../artifacts/src/contracts/onchainid/factory/IdFactory.sol/IdFactory.json';
import {environment} from "../../environments/environment";
import {KeyDTO} from "../shared/identity.model";
import {IdentityComponent} from "../components/identity/identity.component";
import {ErrorHandlerService} from "../shared/error/error-handler.service";
const jsrsasign = require('jsrsasign');


declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class EthereumService implements OnDestroy {
  web3: any;
  factory: any;
  private _provider: ethers.providers.Web3Provider | undefined;
  identity: Identity | null = null;

  get provider() {
    return this._provider;
  }

  set provider(val) {
    this._provider = val;
  }

  private _account: string | null = null;

  get account() {
    return this._account;
  }

  set account(val) {
    this.isConnected = val !== null;
    if (this.isConnected) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    this._account = val;
    this.setIdentity();

  }

  async setIdentity() {
    if (this.isConnected) {
      const provider = this.provider;
      this.factory = new ethers.Contract(environment.idFactoryAdr, factoryJson.abi, this.provider.getSigner());

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
  public isConnectedEvent: EventEmitter<boolean> = new EventEmitter();

  private _isConnected: boolean = false;

  get isConnected(): boolean {
    return this._isConnected;
  }

  //
  set isConnected(val: boolean) {
    this._isConnected = val;
    this.isConnectedEvent.emit(val);
  }

  constructor(private errorHandlerService: ErrorHandlerService) {
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

  async createIdentity() {
    if (this.provider) {

      const address = await this.provider.getSigner().getAddress();
      if (this.factory) {
        const tx = await this.factory.createIdentity('0x388Ef493FaD03e3C73844Be82317017dEfdf6899', '0x388Ef493FaD03e3C73844Be82317017dEfdf6899');
        console.log(`Deploy a new identity as a proxy using factory ${this.factory.address} . tx: ${tx.hash}`);
        await tx.wait();
      }
    }
  }

  async addKey(onchainId: string, claimIssuerAddr: string, keyType: string) {
    const signer = this.provider.getSigner();
    const identity = await Identity.at(onchainId, this.provider.getSigner());
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
    const signer = this.provider.getSigner();
    const identity = await Identity.at(onchainId, this.provider.getSigner());
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

      const identity = await Identity.at(onchainId, this.provider.getSigner());

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

  async addClaim(onchainId: string, ciOnchainId: string, topic: number, data: string) {
    if (this.provider != null) {
      try {
        const signer = this.provider.getSigner();
        const identity = await Identity.at(onchainId, signer);


        // prepare the claim
        const claim = new IdentitySDK.Claim({
          address: onchainId,
          data: IdentitySDK.utils.toHex(data),
          issuer: ciOnchainId,
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

  async getClaimIdsByTopic(onchainId: number, topic: number) {
    const identity = new IdentitySDK.Identity('0xadD92F8Ef0729E969c5a98Ea5740c9b644B362e3', this.provider.getSigner());

    const claims = await identity.getClaimsByTopic(109741294);

    console.log(claims);
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
