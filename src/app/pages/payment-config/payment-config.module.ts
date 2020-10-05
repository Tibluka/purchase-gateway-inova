import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentConfigRoutingModule } from './payment-config-routing.module';
import { PaymentConfigComponent } from './payment-config.component';
import { InstallmentsComponent } from 'src/app/components/installments/installments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsideModule } from 'src/app/components/aside/aside.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskModule } from 'ngx-mask';
import { CardComponent } from 'src/app/components/card/card.component';
import { AddressComponent } from 'src/app/components/address/address.component';




@NgModule({
  declarations: [
    PaymentConfigComponent,
    InstallmentsComponent,
    CardComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    PaymentConfigRoutingModule,
    FormsModule,
    AsideModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class PaymentConfigModule { }
