import {Injectable, OnDestroy} from "@angular/core";
import {ethers} from 'ethers';
import {EthereumService} from "./ethereum.service";
import {ErrorHandlerService} from "../shared/error/error-handler.service";
import {Subscription} from "rxjs";
import trexFactoryJson from "../../contracts/TREX/factory/TREXFactory.sol/TREXFactory.json";
import claimTopicsRegistryJson
  from "../../contracts/TREX/registry/implementation/ClaimTopicsRegistry.sol/ClaimTopicsRegistry.json";
import trustedIssuersRegistryJson
  from "../../contracts/TREX/registry/implementation/TrustedIssuersRegistry.sol/TrustedIssuersRegistry.json";
import identityRegistryJson
  from "../../contracts/TREX/registry/implementation/IdentityRegistry.sol/IdentityRegistry.json";
import modularComplianceJson
  from "../../contracts/TREX/compliance/modular/ModularCompliance.sol/ModularCompliance.json";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class TokenFactoryService extends EthereumService implements OnDestroy {
  trexFactory: any;
  identityRegistry: any;
  claimTopicsRegistry: any;
  trustedIssuerRegistry: any;
  modularCompliance: any;
  subscription: Subscription;


  constructor(errorHandlerService: ErrorHandlerService) {
    super(errorHandlerService);
    this.event$.subscribe(val => {
      if (this.isConnected) {
        this.trexFactory = new ethers.Contract(environment.trexFactoryAdr, trexFactoryJson.abi, this.provider.getSigner());
        this.identityRegistry = new ethers.Contract(environment.identityRegAdr, identityRegistryJson.abi, this.provider.getSigner());
        this.claimTopicsRegistry = new ethers.Contract(environment.claimTopicsRegAdr, claimTopicsRegistryJson.abi, this.provider.getSigner());
        this.trustedIssuerRegistry = new ethers.Contract(environment.trustedIssuersRegAdr, trustedIssuersRegistryJson.abi, this.provider.getSigner());
        this.modularCompliance = new ethers.Contract(environment.modularComplianceAdr, modularComplianceJson.abi, this.provider.getSigner());
        console.log(this.trexFactory);
      } else {
        this.trexFactory = null;
        this.identityRegistry = null;
        this.claimTopicsRegistry = null;
        this.trustedIssuerRegistry = null;
        this.modularCompliance = null;
      }
    })
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscription.unsubscribe();
  }

  // Identity Registry

  async checkIfRegistered(address: string) {
    const txResponse = await this.identityRegistry.check(address);

    const txReceipt = await txResponse.wait();
  }

  async getClaimTopics() {

  }

  async setClaimTopics() {

  }


}
