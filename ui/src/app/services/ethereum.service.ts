import {EventEmitter, Injectable, OnDestroy, OnInit} from '@angular/core';
import {ethers} from 'ethers';


declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class EthereumService implements OnDestroy{
  web3: any;
  private _provider: ethers.providers.Web3Provider | undefined;

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
    if (this.isConnected) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    this._account = val;
  }

  public isConnectedEvent: EventEmitter<boolean>  = new EventEmitter();

  private _isConnected: boolean = false;

  get isConnected(): boolean {
    return this._isConnected;
  }

  set isConnected(val: boolean) {
    this._isConnected = val;
    this.isConnectedEvent.emit(val);
  }

  constructor() {
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
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts?.length > 0) {
          this.account = accounts[0]
          this.isConnected = true;
        } else {
          this.account = null;
          this.isConnected = false;
        }
        return accounts;
      } catch (error) {
        this.account = null;
        this.isConnected = false;
        throw new Error('User denied account access');
      }
    } else {
      this.account = null;
      this.isConnected = false;
      throw new Error('MetaMask is not installed');
    }
  }

  async checkIsConencted(): Promise<boolean> {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        this.account = accounts[0];
        this.isConnected = true;
        return true;
      }
    }
    this.account = null;
    this.isConnected = false;
    return false;
  }

  handleAccountsChanged(accounts: Array<string>) {
    this.account = accounts?.length > 0 ? accounts[0] : null;
    this.isConnected = accounts?.length > 0
  }

}
