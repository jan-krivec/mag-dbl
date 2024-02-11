import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenubarComponent } from './components/menubar/menubar.component';
import { FileUploadModule } from 'primeng/fileupload';
import {IfcViewerComponent} from "./shared/ifc/ifc-viewer/ifc-viewer.component";
import {IdentityComponent} from "./components/identity/identity.component";

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    IfcViewerComponent,
    IdentityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    ButtonModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
