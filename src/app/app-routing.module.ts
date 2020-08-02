import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatorGuard } from './services/authenticator.guard';

const routes: Routes = [
  { path: '', loadChildren: './pages/error/error.module#ErrorModule' },
  { path: 'error', loadChildren: './pages/error/error.module#ErrorModule' },
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
