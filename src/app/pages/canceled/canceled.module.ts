import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanceledRoutingModule } from './canceled-routing.module';
import { CanceledComponent } from './canceled.component';
import { FinishPageModule } from 'src/app/components/finish-page/finish-page.module';


@NgModule({
  declarations: [
    CanceledComponent
  ],
  imports: [
    CommonModule,
    CanceledRoutingModule,
    FinishPageModule

  ]
})
export class CanceledModule { }
