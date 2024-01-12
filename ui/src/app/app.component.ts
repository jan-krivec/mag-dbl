import { Component } from '@angular/core';
import { EthereumService } from './services/ethereum.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  /*template: `
    <button (click)="connectMetaMask()">Connect MetaMask</button>
  `,*/
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private ethereumService: EthereumService, private http: HttpClient) {}

  uploadedFiles: File[] = [];

  async connectMetaMask() {
    try {
      const accounts = await this.ethereumService.requestAccountAccess();
      console.log('Connected account:', accounts[0]);
      // Perform other Ethereum operations here
    } catch (error) {
      console.error(error);
    }
  }

  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
  }

  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.http.post('http://localhost:3000/upload', formData)
      .subscribe((response) => {
        console.log('response received is ', response);
      })
  }
}
