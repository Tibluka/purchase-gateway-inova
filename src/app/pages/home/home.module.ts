import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
/* import { AsideComponent } from '../aside/aside.component';
import { InstallmentsComponent } from '../installments/installments.component'; */
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from '../payment/payment.component';
import { AsideComponent } from '../aside/aside.component';


@NgModule({
  declarations: [
    HomeComponent,
    PaymentComponent,
    AsideComponent
  /*   AsideComponent,
    InstallmentsComponent */
  ],

  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
  ]
})
export class HomeModule { }
