import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {EthereumService} from "../../services/ethereum.service";
import {Subscription} from "rxjs";
import {IdentityService} from "../../services/identity.service";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.conponent.css']
})
export class MenubarComponent implements OnInit, AfterViewInit, OnDestroy {

  public items: MenuItem[] | undefined;
  private subscription: Subscription | null = null;
  public isConnected: boolean = false;

  constructor(private ethereumService: IdentityService) {
  }

  ngOnInit() {
    this.subscription = this.ethereumService.isConnectedEvent.subscribe((isConnected) => {
      this.isConnected = isConnected;
      this.ethereumService.getClaims();
    });
    this.ethereumService.checkIsConencted();
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark'
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video'
              }
            ]
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
          },
          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Identity',
        icon: 'pi pi-fw pi-trash',
        routerLink: ['identity']
      },
      {
        label: 'Ifc VIewer',
        icon: 'pi pi-fw pi-trash',
        routerLink: ['ifcViewer']
      }
    ];
  }

  ngAfterViewInit() {
    this.ethereumService.checkIsConencted();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async connectMetaMask() {
    try {
      const accounts = await this.ethereumService.requestAccountAccess();
      console.log('Connected account:', accounts[0]);
      await this.ethereumService.getClaims();
      // Perform other Ethereum operations here
    } catch (error) {
      console.error(error);
    }
  }

}
