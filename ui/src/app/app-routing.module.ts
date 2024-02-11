import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IdentityComponent} from "./components/identity/identity.component";
import {IfcViewerComponent} from "./shared/ifc/ifc-viewer/ifc-viewer.component";

const routes: Routes = [
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
