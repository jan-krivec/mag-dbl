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
import {environment} from "../../environments/environment" ;
import {Identity} from "@onchain-id/identity-sdk";


@Injectable({
  providedIn: 'root'
})
export class TrexFactoryService extends EthereumService implements OnDestroy {
  trexFactory: any;
  identityRegistry: any;
  claimTopicsRegistry: any;
  trustedIssuerRegistry: any;
  modularCompliance: any;
  subscription: Subscription;


  constructor(errorHandlerService: ErrorHandlerService) {
    super(errorHandlerService);
    this.trexFactory = new ethers.Contract(environment.trexFactoryAdr, trexFactoryJson.abi, this.readProvider.getSigner());
    this.identityRegistry = new ethers.Contract(environment.identityRegAdr, identityRegistryJson.abi, this.readProvider.getSigner());
    this.claimTopicsRegistry = new ethers.Contract(environment.claimTopicsRegAdr, claimTopicsRegistryJson.abi, this.readProvider.getSigner());
    this.trustedIssuerRegistry = new ethers.Contract(environment.trustedIssuersRegAdr, trustedIssuersRegistryJson.abi, this.readProvider.getSigner());
    this.modularCompliance = new ethers.Contract(environment.modularComplianceAdr, modularComplianceJson.abi, this.readProvider.getSigner());
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscription.unsubscribe();
  }

  // Identity Registry

  async checkIfRegistered(address: string) {

    try {
      const txResponse = await this.identityRegistry.contains(address);

      if (!txResponse) {
        this.errorHandlerService.showSnackBar('Not registered');
      } else {
        this.errorHandlerService.showSnackBar('Is registered');
      }
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }

  async getIdentiy(address: string) {
    try {
      const txResponse = await this.identityRegistry.identity(address);

      this.errorHandlerService.showSnackBar(txResponse.toString());
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }

  async isVerified(address: string) {
    try {
      const txResponse = await this.identityRegistry.isVerified(address);

      if (!txResponse) {
        this.errorHandlerService.showSnackBar('Not verified');
      } else {
        this.errorHandlerService.showSnackBar('Is verfied');
      }
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }

  async registerIdentity(address: string) {

    try {
      if (this.writeProvider) {
        const idAddress = await this.factory.getIdentity(address);

        const txResponse = await this.identityRegistry.connect(this.writeProvider.getSigner()).registerIdentity(address, idAddress);

        await txResponse.wait();
      }
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }


  async deleteIdentity(address: string) {
    try {
      if (this.writeProvider) {
        const idAddress = await this.factory.getIdentity(address);

        const txResponse = await this.identityRegistry.deleteIdentity(address);

        await txResponse.wait();
      }
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }

  // Claim Topics Registry

  async getClaimTopics() {
    try {
        const claimTopics = await this.claimTopicsRegistry.getClaimTopics();
        return claimTopics;
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }

  async addClaimTopic(claimTopic: number) {

    const owner = await this.claimTopicsRegistry.owner();

    console.log(owner);
    try {
      if (this.writeProvider) {
        const txResponse = await this.claimTopicsRegistry.connect(this.writeProvider.getSigner()).addClaimTopic(claimTopic);

        await txResponse.wait();
        return;
      }
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }

  async removeClaimTopic(claimTopic: number) {
    try {
      if (this.writeProvider) {
        const txResponse = await this.claimTopicsRegistry.connect(this.writeProvider.getSigner()).removeClaimTopic(claimTopic);

        await txResponse.wait();
        return;
      }
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }

  async getTrustedIssuers() {
    try {
      const trustedIssuers = await this.trustedIssuerRegistry.getTrustedIssuers();
      return trustedIssuers;
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }

  async isTrustedIssuer() {
    try {
      const isTrustedIssuer = await this.trustedIssuerRegistry.isTrustedIssuer();
      return isTrustedIssuer;
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }

  async getTrustedIssuerClaimTopics(address: string) {
    try {
      const claimTopics = await this.trustedIssuerRegistry.getTrustedIssuerClaimTopics(address);
      return claimTopics;
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }

  async addTrustedIssuer(address: string, claimTopics: number[]) {
    try {
      if (this.writeProvider) {
        const txResponse = await this.trustedIssuerRegistry.connect(this.writeProvider.getSigner()).addTrustedIssuer(address, claimTopics);

        await txResponse.wait();
        return;
      }
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }

  async removeTrustedIssuer(address: string) {
    try {
      if (this.writeProvider) {
        const txResponse = await this.trustedIssuerRegistry.connect(this.writeProvider.getSigner()).removeTrustedIssuer(address);

        await txResponse.wait();
        return;
      }
    } catch (e) {
      this.errorHandlerService.displayError(e.data?.data?.reason ? e.data.data.reason : e.message);
    }
  }
}
