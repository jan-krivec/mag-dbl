import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrexComponent} from "./components/trex/trex.component";
import {IdentityComponent} from "./components/identity/identity.component";

const routes: Routes = [
  {
    path: 'factory',
    component: TrexComponent
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
