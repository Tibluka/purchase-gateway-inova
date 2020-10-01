import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefundedComponent } from './refunded.component';


const routes: Routes = [
  {path: '', component: RefundedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefundedRoutingModule { }
