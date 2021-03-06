import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { NavbarComponent } from './component/general/navbar/navbar.component';
import { DiscoveryComponent } from './component/discovery/discovery.component';
import { BannerComponent } from './component/general/banner/banner.component';
import { GoodShowPipe } from './common/pipe/good-show.pipe';
import { AccountComponent } from './component/user/account/account.component';
import { LoginComponent } from './component/user/login/login.component';
import { ClarityModule } from '@clr/angular';
import { PopupComponent } from './component/popup/popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRespComponent } from './component/user/login-resp/login-resp.component';
import { EscrowAccountComponent } from './component/popup/escrow-account/escrow-account.component';
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
    GoodShowPipe,
    AccountComponent,
    LoginComponent,
    PopupComponent,
    LoginRespComponent,
    EscrowAccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule ,
    MaterialModuleModule,
    OwlModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    ClarityModule,
    //响应式表单模块
    ReactiveFormsModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent,EscrowAccountComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
