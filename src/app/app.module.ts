import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './pages/aside/aside.component';
import { InstallmentsComponent } from './pages/installments/installments.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PurchaseReviewComponent } from './pages/purchase-review/purchase-review.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    InstallmentsComponent,
    PaymentComponent,
    PurchaseReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
