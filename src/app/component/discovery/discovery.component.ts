import { Component, OnInit } from '@angular/core';
import { Banner } from '../../model/banner';
import { StoreService } from 'src/app/service/store/store.service';
import { Observable } from 'rxjs';
import { GoodResult } from 'src/app/model/good.result';
import { take } from 'rxjs/operators';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoveryComponent implements OnInit {

  goodsInfo: GoodResult = null;
  maxGoodCount = 6;
  banners: Banner[] = [
    {
      url: 'guarantee_borrow_zt.html',
      image: '../../assets/images/banners/04.jpg',
      alt: ''
    },
    {
      url: 'guarantee_borrow_company.html',
      image: '../../assets/images/banners/12.jpg',
      alt: ''
    },
    {
      url: 'xr_compliance_18.html',
      image: '../../assets/images/banners/06.jpg',
      alt: ''
    },
  ];

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.getGoods();
  }
  getGoods() {
    this.storeService.getHotGoods$().pipe().subscribe(
      r => {
        this.goodsInfo = r;
      });
  }

}
