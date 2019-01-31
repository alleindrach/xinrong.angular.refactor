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
import { HomeComponent } from './component/home/home.component';
import { OwlModule } from 'ngx-owl-carousel';
import { Loantype2namePipe } from './common/pipe/loantype2name.pipe';
import { BidsComponent } from './component/invest/bids/bids.component';
import { ServerTimeInterceptor } from './server.time.interceptor';
import { CommafyCNPipe } from './common/pipe/commafy-cn.pipe';
import { SectionShowPipe } from './common/pipe/section-show.pipe';
import { InvestComponent } from './component/invest/invest/invest.component';
import { BidDetailComponent } from './component/invest/bid.detail/bid.detail.component';
import { MillionShowPipe } from './common/pipe/million-show.pipe';
import { BidTabsComponent } from './component/invest/bid.tabs/bid.tabs.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { DiscoveryComponent } from './component/discovery/discovery.component';
import { BannerComponent } from './component/banner/banner.component';
import { GoodShowPipe } from './common/pipe/good-show.pipe';


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
    BidTabsComponent,
    NavbarComponent,
    DiscoveryComponent,
    BannerComponent,
    GoodShowPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    OwlModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
