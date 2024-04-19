import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TokenFactoryComponent} from "./components/token-factory/token-factory.component";
import {IdentityComponent} from "./components/identity/identity.component";

const routes: Routes = [
  {
    path: 'factory',
    component: TokenFactoryComponent
  },
  {
    path: 'identity',
    component: IdentityComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
