import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TokenFactoryComponent} from "./components/token-factory/token-factory.component";
import {MenubarComponent} from "./components/menubar/menubar.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EthereumService} from "./services/ethereum.service";
import {IdentityComponent} from "./components/identity/identity.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from '@angular/material/grid-list';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from "@angular/material/dialog";
import {ErrorDialogComponent} from "./shared/error/error-dialog.component";
import {ErrorHandlerService} from "./shared/error/error-handler.service";

@NgModule({
  declarations: [
    AppComponent,
    TokenFactoryComponent,
    MenubarComponent,
    IdentityComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers: [EthereumService, ErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
