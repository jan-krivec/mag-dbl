import { Component } from '@angular/core';
import { EthereumService } from './services/ethereum.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="connectMetaMask()">Connect MetaMask</button>
  `,
})
export class AppComponent {
  constructor(private ethereumService: EthereumService) {}

  async connectMetaMask() {
    try {
      const accounts = await this.ethereumService.requestAccountAccess();
      console.log('Connected account:', accounts[0]);
      // Perform other Ethereum operations here
    } catch (error) {
      console.error(error);
    }
  }
}
