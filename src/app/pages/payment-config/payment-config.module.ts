import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentConfigRoutingModule } from './payment-config-routing.module';
import { PaymentConfigComponent } from './payment-config.component';
import { InstallmentsComponent } from 'src/app/components/installments/installments.component';
import { FormsModule } from '@angular/forms';
import { AsideModule } from 'src/app/components/aside/aside.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskModule } from 'ngx-mask';




@NgModule({
  declarations: [
    PaymentConfigComponent,
    InstallmentsComponent
  ],
  imports: [
    CommonModule,
    PaymentConfigRoutingModule,
    FormsModule,
    AsideModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    NgxMaskModule.forRoot()
  ]
})
export class PaymentConfigModule { }
