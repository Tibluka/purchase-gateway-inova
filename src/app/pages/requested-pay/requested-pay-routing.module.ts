import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestedPayComponent } from './requested-pay.component';


const routes: Routes = [
  { path: '', component: RequestedPayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestedPayRoutingModule { }
