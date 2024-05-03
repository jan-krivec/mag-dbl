export class ClaimDTO {

  constructor(public id?: string,
              public onchainId?: string,
              public topic?: number,
              public issuer?: string,
              public data?: string,
              public signature?: string,
              public uri?: string) {

  }
}

export class KeyDTO {

  constructor(public key?: string,
              public type?: string,
              public purpose?: string[]) {
  }

}
