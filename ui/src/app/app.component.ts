import { Component } from '@angular/core';
import { EthereumService } from './services/ethereum.service';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {UploadEvent} from "primeng/fileupload";

@Component({
  selector: 'app-root',
  /*template: `
    <button (click)="connectMetaMask()">Connect MetaMask</button>
  `,*/
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  constructor(private ethereumService: EthereumService, private http: HttpClient, private messageService: MessageService) {}

  uploadedFiles: File[] = [];

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

  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }
}
