import {IdentitySDK} from "@onchain-id/identity-sdk";

export class ClaimDTO {
  onchainId: string | undefined | null = null;
  claimType: number | undefined | null = null;
}

export class KeyDTO {

  constructor(public key?: string, public type?: string, public purpose?: string[]) {
  }

}
