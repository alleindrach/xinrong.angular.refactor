import { Component, OnInit, Input } from '@angular/core';
import { Banner } from '../../../model/banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() banners: Banner[];
  @Input() curBanner = 1;
  @Input() bannerOptions = {
    dots: false, items: 1,
    loop: true,
    nav: false,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 3550,
    onChanged: this.onChanged.bind(this)
  };
  constructor() { }
  onChanged(event): void {
    this.curBanner = event.item.index % (event.item.count) + 1;
  }
  ngOnInit() {
  }

}
