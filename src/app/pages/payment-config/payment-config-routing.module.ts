import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentConfigComponent } from './payment-config.component';


const routes: Routes = [
  { path: ':id', component: PaymentConfigComponent },
  { path: '', component: PaymentConfigComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentConfigRoutingModule { }
