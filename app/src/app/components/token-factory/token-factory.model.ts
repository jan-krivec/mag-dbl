export class TokenFactoryDTO {
  public name: string | undefined | null = null;
  public symbol: string | undefined | null = null;
  public decimals: number | undefined | null = null;


}

export class ClaimDetails {
  public claimTopics: number[] | undefined | null = null;
  public issuers: string[] | undefined | null = null;

}
