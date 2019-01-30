import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Scroll } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleModule } from './material-module/material-module.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OwlModule } from 'ngx-owl-carousel';
import { Loantype2namePipe } from './service/invest/loantype2name.pipe';
import { BidsComponent } from './invest/bids/bids.component';
import { ServerTimeInterceptor } from './server.time.interceptor';
import { CommafyCNPipe } from './commafy-cn.pipe';
import { SectionShowPipe } from './service/invest/section-show.pipe';
import { InvestComponent } from './invest/invest/invest.component';
import { BidDetailComponent } from './invest/bid.detail/bid.detail.component';
import { MillionShowPipe } from './million-show.pipe';
import { BidTabsComponent } from './invest/bid.tabs/bid.tabs.component';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ServerTimeInterceptor, multi: true },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Loantype2namePipe,
    BidsComponent,
    CommafyCNPipe,
    SectionShowPipe,
    InvestComponent,
    BidDetailComponent,
    MillionShowPipe,
    BidTabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
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
