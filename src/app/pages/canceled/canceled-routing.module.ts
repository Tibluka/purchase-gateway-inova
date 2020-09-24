import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanceledComponent } from './canceled.component';


const routes: Routes = [
  {path: '', component: CanceledComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanceledRoutingModule { }
