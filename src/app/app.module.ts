import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentConfigModule } from './pages/payment-config/payment-config.module';
import { FinishModule } from './pages/finish/finish.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorModule } from './pages/error/error.module';
import { RequestedPayModule } from './pages/requested-pay/requested-pay.module';
import { HomeModule } from './pages/home/home.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FinishModule,
    PaymentConfigModule,
    ErrorModule,
    RequestedPayModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HomeModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
