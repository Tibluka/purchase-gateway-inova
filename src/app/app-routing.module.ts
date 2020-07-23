import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomeModule' },
  { path: 'payment', loadChildren: './pages/payment-config/payment-config.module#PaymentConfigModule' },
  { path: 'finish', loadChildren: './pages/finish/finish.module#FinishModule'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
