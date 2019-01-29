import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlModule } from 'ngx-owl-carousel';
import { HttpClientModule } from '@angular/common/http';
import { Loantype2namePipe } from './service/invest/loantype2name.pipe';
import { CommonModule } from '@angular/common';
import { InvestComponent } from './invest/invest.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {  ServerTimeInterceptor } from './server.time.interceptor';

import {  CommafyCNPipe } from './commafy-cn.pipe';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ServerTimeInterceptor, multi: true },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Loantype2namePipe,
    InvestComponent,
    CommafyCNPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OwlModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
