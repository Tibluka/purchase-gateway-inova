import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatorGuard } from './services/authenticator.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivateChild: [AuthenticatorGuard]},
  { path: 'error', loadChildren: './pages/error/error.module#ErrorModule' },
  { path: 'requested-pay', loadChildren: './pages/requested-pay/requested-pay.module#RequestedPayModule' },
  {
    path: 'payment', loadChildren: './pages/payment-config/payment-config.module#PaymentConfigModule',
    canActivateChild: [AuthenticatorGuard]
  },
  { path: 'finish', loadChildren: './pages/finish/finish.module#FinishModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
