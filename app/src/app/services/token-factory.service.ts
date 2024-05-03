import {Injectable, OnDestroy} from "@angular/core";
import {ethers} from 'ethers';
import {EthereumService} from "./ethereum.service";
import {ErrorHandlerService} from "../shared/error/error-handler.service";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenFactoryService extends EthereumService implements OnDestroy{
  factory: any;
  subscription: Subscription;


  constructor(errorHandlerService: ErrorHandlerService) {
    super(errorHandlerService);
  }

  set account(val) {
    super.account  = val;
    if (this.isConnected) {

    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscription.unsubscribe();
  }

  // async getClaims() {
  //   const claims = await this.identity?.getClaimsByTopic(1);
  //   console.log(claims);
  // }
  //
  //
  // async setIdentity(): Promise<void> {
  //   super.setIdentity();
  //   if (this.isConnected) {
  //
  //     console.log(this.factory);
  //   }
  // }
}
