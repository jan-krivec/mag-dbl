import { NgModule, CUSTOM_ELEMENTS_SCHEMA   } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TrexComponent} from "./components/trex/trex.component";
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
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {TokenFactoryComponent} from "./components/trex/components/tokem-factory/token-factory.component";
import {AgentComponent} from "./components/trex/components/agent/agent.component";
import {IdentityRegistryComponent} from "./components/trex/components/identity-registry/identity-registry.component";
import {
  ClaimTopicsRegistryComponent
} from "./components/trex/components/claim-topics-registry/claim-topics-registry.component";
import {TrexFactoryService} from "./services/trex-factory.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {
  TrustedIssuersRegistryComponent
} from "./components/trex/components/trusted-issuers-registry/trusted-issuers-registry.component";
import {IfcViewerComponent} from "./components/ifc-viewer/ifc-viewer.component";
import {PanelComponent} from "./components/ifc-viewer/panel/panel.component";

@NgModule({
  declarations: [
    AppComponent,
    TrexComponent,
    MenubarComponent,
    IdentityComponent,
    ErrorDialogComponent,
    TokenFactoryComponent,
    AgentComponent,
    IdentityRegistryComponent,
    ClaimTopicsRegistryComponent,
    TrustedIssuersRegistryComponent,
    IfcViewerComponent,
    PanelComponent,
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
    MatDialogModule,
    MatListModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  providers: [EthereumService, ErrorHandlerService, TrexFactoryService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
