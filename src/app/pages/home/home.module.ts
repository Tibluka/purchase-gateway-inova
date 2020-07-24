import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from 'src/app/components/payment/payment.component';
import { AsideModule } from 'src/app/components/aside/aside.module';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [
    HomeComponent,
    PaymentComponent
  ],

  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    AsideModule,
    MatSliderModule
  ]
})
export class HomeModule { 

}
