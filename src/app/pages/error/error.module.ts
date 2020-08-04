import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorRouteComponent } from './error-route.component';
import { FinishPageModule } from 'src/app/components/finish-page/finish-page.module';


@NgModule({
  declarations: [
    ErrorRouteComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
    FinishPageModule
  ]
})
export class ErrorModule { }