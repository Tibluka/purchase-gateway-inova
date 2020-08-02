import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FinishPageComponent } from './finish-page.component';



@NgModule({
  declarations: [
    FinishPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    FinishPageComponent
  ]
})
export class FinishPageModule {

}
