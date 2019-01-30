import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bid-tabs',
  templateUrl: './bid.tabs.component.html',
  styleUrls: ['./bid.tabs.component.scss']
})
export class BidTabsComponent implements OnInit {
  links = [
    {
      path: '/bids/1',
      label: '消费贷等'
    },
    {
      path: '/bids/2',
      label: '优资贷等'
    },
    {
      path: '/bids/3',
      label: '铜仁专区'
    },
    {
      path: '/bids/4',
      label: '存管直投'
    },
    {
      path: '/bids/5',
      label: '债权转让'
    },
  ];
  activeLink = this.links[0];
  constructor() {
  }
  ngOnInit() {
  }

}
