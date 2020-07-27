import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishComponent } from './finish.component';
import { AsideModule } from 'src/app/components/aside/aside.module';
import { FinishPageComponent } from 'src/app/components/finish-page/finish-page.component';
import { FinishRoutingModule } from './finish-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    FinishComponent,
    FinishPageComponent],

  imports: [
    CommonModule,
    AsideModule,
    FinishRoutingModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class FinishModule { }
