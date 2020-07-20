import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './pages/home/home.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PurchaseReviewComponent } from './components/purchase-review/purchase-review.component';
import { PaymentConfigModule } from './pages/payment-config/payment-config.module';


@NgModule({
  declarations: [
    AppComponent,
    PurchaseReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HomeModule,
    PaymentConfigModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
