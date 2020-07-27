import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    AsideComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule
  ],
  exports: [
    AsideComponent
  ]
})
export class AsideModule { 

}
