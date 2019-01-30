import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import {  BidsComponent } from '../invest/bids/bids.component';
import {  BidDetailComponent } from '../invest/bid.detail/bid.detail.component';
import { InvestComponent} from '../invest/invest/invest.component';
import { BidTabsComponent } from '../invest/bid.tabs/bid.tabs.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bidtabs', component: BidTabsComponent },
  { path: 'bids/:type', component: BidsComponent },
  { path: 'bid/:sid', component: BidDetailComponent },
  { path: 'invest/:sid', component: InvestComponent },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
