import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestedPayRoutingModule } from './requested-pay-routing.module';
import { RequestedPayComponent } from './requested-pay.component';
import { FinishPageModule } from 'src/app/components/finish-page/finish-page.module';


@NgModule({
  declarations: [
    RequestedPayComponent
  ],
  imports: [
    CommonModule,
    RequestedPayRoutingModule,
    FinishPageModule
  ]
})
export class RequestedPayModule { }
