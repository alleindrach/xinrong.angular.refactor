import { Component, OnInit } from '@angular/core';
import { OwlModule } from 'ngx-owl-carousel';
import { Banner } from '../../model/banner';
import * as $ from 'jquery';
import { of, from, Observable, interval, timer } from 'rxjs';
import { map, take, takeWhile } from 'rxjs/operators';
import { OwlCarousel } from 'ngx-owl-carousel';
import { ViewChild, ViewEncapsulation } from '@angular/core';
import { AuxService } from '../../service/aux/aux.service';
import { InvestService } from '../../service/invest/invest.service';
import { AjaxResponse } from 'rxjs/ajax';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Utilities } from '../../common/utilities';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  @ViewChild('owlElement') owlElement: OwlCarousel;


  banners: Banner[] = [
    {
      url: 'guarantee_borrow_zt.html',
      image: 'assets/images/banner/04.jpg',
      alt: ''
    },
    {
      url: 'guarantee_borrow_company.html',
      image: 'assets/images/banner/12.jpg',
      alt: ''
    },
    {
      url: 'xr_compliance_18.html',
      image: 'assets/images/banner/06.jpg',
      alt: ''
    },
  ];


  sectionTimer = null;
  transactionInfo = null;
  transactionSummaryInfo = null;
  constructor(private auxService: AuxService, private investService: InvestService) { }
  bannerImages: String[] = new Array();
  announcements: JSON[] = new Array();
  hotSectionLoan: any = null;
  operatTime: any = null;
  getBannerImages(): void {
    from(this.banners).pipe(map((banner) => banner.image)).subscribe(bannerImages => this.bannerImages.push(bannerImages));
  }
  getAnnouncements(): void {
    this.auxService.getAnnouncements$().subscribe(
      (annon) => {
        this.announcements.push(annon);
        timer(3000, 2000).subscribe((x) => {
          $('.announ_list').find('ul:first').animate(
            { marginTop: '-3rem' },
            2000,
            function () {
              $(this).css({
                marginTop: '0px'
              }).find('li:first').appendTo(this);
            }
          );
        });
      });

  }

  getHotSection(): void {
    this.investService.getHotSection$().subscribe(x => {
      this.hotSectionLoan = x.data;
      if (this.hotSectionLoan) {
        if (this.hotSectionLoan.flag === 0) {
          timer(1000, 1000).pipe(
            takeWhile(tick => new Date().getTime() / 1000 < this.hotSectionLoan.stime)
          ).subscribe(
            () => {
              this.sectionTimer = Utilities.timeDiff(this.hotSectionLoan.stime, null);
              console.log('min:', this.sectionTimer.min, 'sec', this.sectionTimer.sec);
            },
            undefined,
            () => {
              this.sectionTimer = null;
              this.hotSectionLoan.flag = 1;
            }
          );
        }
      }
    });
  }
  showOperatTime(): void {
    timer(1000, 1000).subscribe(
      x => {
        const firstDate = new Date();
        firstDate.setFullYear(2012);
        firstDate.setMonth(11);
        firstDate.setDate(27);
        firstDate.setHours(0);
        firstDate.setMinutes(0);
        firstDate.setSeconds(0);
        firstDate.setMilliseconds(0);

        const nowDate = new Date();
        const tempDate = new Date(firstDate.getTime());
        tempDate.setFullYear(nowDate.getFullYear());

        let year = nowDate.getFullYear() - 2012;
        if (tempDate > nowDate) {
          tempDate.setFullYear(nowDate.getFullYear() - 1);
          year = year - 1;
        }

        const day = ((nowDate.getTime() - tempDate.getTime()) / 86400000).toFixed(0);
        const hours = nowDate.getHours().toString();
        const minutes = nowDate.getMinutes().toString();
        const seconds = nowDate.getSeconds() < 10 ? '0' + nowDate.getSeconds() : nowDate.getSeconds().toString();

        this.operatTime = JSON;
        this.operatTime['year'] = this.splitTime(year.toString());
        this.operatTime['day'] = this.splitTime(day);
        this.operatTime['hour'] = this.splitTime(hours);
        this.operatTime['minute'] = this.splitTime(minutes);
        this.operatTime['second'] = this.splitTime(seconds);
      }
    );
  }
  splitTime(time: string): string {
    const stime = (time + '').split('');
    let splitarr = '';
    for (let i = 0; i < stime.length; i++) {
      splitarr += '<span>' + stime[i] + '</span>';
    }
    return splitarr;
  }
  ngOnInit() {
    this.getBannerImages();
    this.getAnnouncements();
    this.getHotSection();
    this.getTransactionInfo();
    this.getTransactionSummaryInfo();
    this.showOperatTime();
  }

  next(): void {
    this.owlElement.next([200]);
  }

  goInvest(sid: number): void {

  }
  getTransactionInfo(): void {
    this.investService.getTotalTransactionMoney$().subscribe(x => this.transactionInfo = x);
  }
  getTransactionSummaryInfo(): void {
    this.investService.getTransactionBatch$().subscribe(
      x =>
        this.transactionSummaryInfo = x
    );
  }
}
