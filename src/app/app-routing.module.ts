import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsideComponent } from './pages/aside/aside.component';
import { InstallmentsComponent } from './pages/installments/installments.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PurchaseReviewComponent } from './pages/purchase-review/purchase-review.component';


const routes: Routes = [
  {path: 'aside', component: AsideComponent},
  {path: 'installments', component: InstallmentsComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'purchase-review', component: PurchaseReviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
