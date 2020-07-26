import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AsideComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    AsideComponent
  ]
})
export class AsideModule { 

}
