import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishComponent } from './finish.component';
import { AsideModule } from 'src/app/components/aside/aside.module';
import { FinishPageComponent } from 'src/app/components/finish-page/finish-page.component';
import { FinishRoutingModule } from './finish-routing.module';





@NgModule({
  declarations: [
    FinishComponent,
    FinishPageComponent],

  imports: [
    CommonModule,
    AsideModule,
    FinishRoutingModule
  ]
})
export class FinishModule { }
