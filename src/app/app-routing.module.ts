import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsideComponent } from './pages/aside/aside.component';


const routes: Routes = [
  {path: 'aside', component: AsideComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
