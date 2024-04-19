import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {EthereumService} from "../../services/ethereum.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.conponent.css']
})
export class MenubarComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscription: Subscription | null = null;
  public isConnected: boolean = false;

  constructor(private ethereumService: EthereumService) {
  }

  ngOnInit() {
    this.subscription = this.ethereumService.isConnectedEvent.subscribe((isConnected: boolean) => {
      this.isConnected = isConnected;
    });
    // this.ethereumService.checkIsConencted();
  }

  ngAfterViewInit() {
    // this.ethereumService.checkIsConencted();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

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
