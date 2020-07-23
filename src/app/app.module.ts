import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './pages/home/home.module'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PurchaseReviewComponent } from './components/purchase-review/purchase-review.component';
import { PaymentConfigModule } from './pages/payment-config/payment-config.module';
import { FinishModule } from './pages/finish/finish.module';


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
    FinishModule,
    PaymentConfigModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
