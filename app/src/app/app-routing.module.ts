import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrexComponent} from "./components/trex/trex.component";
import {IdentityComponent} from "./components/identity/identity.component";
import {IfcViewerComponent} from "./components/ifc-viewer/ifc-viewer.component";

const routes: Routes = [
  {
    path: 'factory',
    component: TrexComponent
  },
  {
    path: 'identity',
    component: IdentityComponent
  },
  {
    path: 'ifcViewer',
    component: IfcViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
