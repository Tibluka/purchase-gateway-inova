import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefundedRoutingModule } from './refunded-routing.module';
import { RefundedComponent } from './refunded.component';
import { FinishPageModule } from 'src/app/components/finish-page/finish-page.module';


@NgModule({
  declarations: [
    RefundedComponent
  ],
  imports: [
    CommonModule,
    RefundedRoutingModule,
    FinishPageModule
  ]
})
export class RefundedModule { }
