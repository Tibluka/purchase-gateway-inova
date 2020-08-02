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
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
