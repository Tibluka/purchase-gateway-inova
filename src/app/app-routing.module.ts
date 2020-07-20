import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsideComponent } from './pages/aside/aside.component';
import { InstallmentsComponent } from './pages/installments/installments.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PurchaseReviewComponent } from './pages/purchase-review/purchase-review.component';


const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomeModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
