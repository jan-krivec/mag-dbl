import {Injectable} from "@angular/core";
import {EthereumService} from "./ethereum.service";
import {Subscription} from "rxjs";
import {ethers, Signer} from "ethers";
import {Identity, IdentitySDK} from "@onchain-id/identity-sdk";

@Injectable({
  providedIn: 'root'
})
export class IdentityService extends EthereumService{

  private connectedSubsciption: Subscription;
  identity: Identity | null = null;

  constructor() {
    super();
    this.connectedSubsciption = this.isConnectedEvent.subscribe(async (val: boolean) => {
      const account = this.account ? this.account : "";
      const provider = this.provider;
      // if (account !== null && provider !== null) {
      //   this.identity = await IdentitySDK.Identity.at(account, { provider });
      //   console.log(this.identity);
      // }
    });
  }

  async getClaims() {
    // const claims = await this.identity?.getClaimsByTopic(1);
    // console.log(claims);
  }

  async createIdentity() {
    if (this.provider) {

      const DEPLOY_PRIVATE_KEY = '0x5202280f7887b8962a7351b037eb76392fd6dec3d979a6312933a160271fb266';
      const deployWallet = new ethers.Wallet(DEPLOY_PRIVATE_KEY, this.provider);

      const identity = await IdentitySDK.Identity.deployNew({
        managementKey: this.account,
        implementationAuthority: IdentitySDK.constants.implementationAuthorities.homestead
      }, {signer: deployWallet});

      await identity.deployed();
      console.log(identity);
      await identity.addKey(IdentitySDK.utils.crypto.keccak256(this.account), IdentitySDK.utils.enums.KeyPurpose.CLAIM, IdentitySDK.utils.enums.KeyType.ECDSA);

      identity.useProvider(this.provider.getSigner());
    }
  }

}
