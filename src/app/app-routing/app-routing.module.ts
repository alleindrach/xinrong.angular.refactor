import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../component/home/home.component';
import { BidsComponent } from '../component/invest/bids/bids.component';
import { BidDetailComponent } from '../component/invest/bid.detail/bid.detail.component';
import { InvestComponent } from '../component/invest/invest/invest.component';
import { BidTabsComponent } from '../component/invest/bid.tabs/bid.tabs.component';
import { DiscoveryComponent } from '../component/discovery/discovery.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bidtabs', component: BidTabsComponent },
  { path: 'discovery', component: DiscoveryComponent },
  { path: 'bids/:at', component: BidsComponent },
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
