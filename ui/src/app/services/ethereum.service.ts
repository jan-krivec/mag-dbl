import {EventEmitter, Injectable, OnDestroy, OnInit} from '@angular/core';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class EthereumService implements OnInit, OnDestroy{
  web3: any;
  public isConnectedEvent: EventEmitter<void>  = new EventEmitter();

  private _isConnected: boolean = false;

  get isConnected(): boolean {
    return this._isConnected;
  }

  set isConnected(val: boolean) {
    this._isConnected = val;
  }

  constructor() {
    if (window.ethereum !== 'undefined') {
      window.ethereum.addListener('accountsChanged', this.handleAccountsChanged);
    }
  }

  ngOnInit() {
    this.checkIsConencted();
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
          this.isConnected = true;
        } else {
          this.isConnected = false;
        }
        return accounts;
      } catch (error) {
        this.isConnected = false;
        throw new Error('User denied account access');
      }
    } else {
      this.isConnected = false;
      throw new Error('MetaMask is not installed');
    }
  }

  async checkIsConencted(): Promise<boolean> {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        this.isConnected = true;
        return true;
      }
    }
    this.isConnected = false;
    return false;
  }

  handleAccountsChanged(accounts: Array<string>) {
    this.isConnected = accounts?.length > 0
    this.isConnectedEvent.emit();
  }

}
