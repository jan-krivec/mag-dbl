import {Injectable} from "@angular/core";
import {EthereumService} from "./ethereum.service";

@Injectable({
  providedIn: 'root'
})
export class TokenFactoryService {
  factory: any;

  constructor() {
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
