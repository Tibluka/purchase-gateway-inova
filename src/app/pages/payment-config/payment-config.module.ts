import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentConfigRoutingModule } from './payment-config-routing.module';
import { PaymentConfigComponent } from './payment-config.component';
import { InstallmentsComponent } from 'src/app/components/installments/installments.component';
import { FormsModule } from '@angular/forms';
import { AsideModule } from 'src/app/components/aside/aside.module';


@NgModule({
  declarations: [
    PaymentConfigComponent,
    InstallmentsComponent
  ],
  imports: [
    CommonModule,
    PaymentConfigRoutingModule,
    FormsModule,
    AsideModule
  ]
})
export class PaymentConfigModule { }
