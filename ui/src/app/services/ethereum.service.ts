import { Injectable } from '@angular/core';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class EthereumService {

  constructor() { }

  async checkMetaMask(): Promise<boolean> {
    return typeof window.ethereum !== 'undefined';
  }

  async requestAccountAccess(): Promise<string[]> {
    if (await this.checkMetaMask()) {
      try {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        throw new Error('User denied account access');
      }
    } else {
      throw new Error('MetaMask is not installed');
    }
  }
}
