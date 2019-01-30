import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ViewChild, ViewEncapsulation } from '@angular/core';
import { ChangeDetectionStrategy, OnInit, Component } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { InvestService } from '../../service/invest/invest.service';
import { SectionList } from '../../service/invest/section.list';
import { Section } from '../../service/invest/section';
@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BidsComponent implements OnInit {
  ds1 = null;
  ds2 = null;
  ds5 = null;
  constructor(private investService: InvestService) { }

  ngOnInit() {
    // this.ds1 = new MyDataSource(this.investService, InvestService.SubprimeSection);
    // this.ds1.fetchPage(1);
    // this.ds2 = new MyDataSource(this.investService, InvestService.PrimarySection);
    // this.ds2.fetchPage(1);
    this.ds5 = new MyDataSource(this.investService, InvestService.TransferSection);
    this.ds5.fetchPage(1);
  }

}
export class MyDataSource extends DataSource<Section | undefined> {

  constructor(private investService: InvestService, private type: number) { super(); }
  public itemCount = 0;
  public sectionsInfo: JSON = null;

  private length = 1000;
  private pageSize = 10;

  private cachedData = Array.from<Section>({ length: this.length });
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<(Section | undefined)[]>(this.cachedData);
  private subscription = new Subscription();

  connect(collectionViewer: CollectionViewer): Observable<(Section | undefined)[]> {
    this.subscription.add(collectionViewer.viewChange.subscribe(
      range => {
        const startPage = this.getPageForIndex(range.start);
        const endPage = this.getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this.fetchPage(i);
        }
      }));
    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }
  getDataSize(): number {
    return this.cachedData.length;
  }
  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize) + 1;
  }

  fetchPage(page: number) {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    // Use `setTimeout` to simulate fetching data from server.
    this.investService.getSections$(this.type, page, this.pageSize).subscribe(
      (sectionlist: SectionList) => {
        if (this.itemCount !== sectionlist.total) {
          if (this.itemCount === 0) {
            this.cachedData.splice(sectionlist.total);
            this.sectionsInfo = JSON;
            this.sectionsInfo['leftAmount'] = sectionlist.leftAmountSum;
            this.sectionsInfo['eswLeftAmount'] = sectionlist.eswLeftAmountSum;
            this.sectionsInfo['normalLeftAmount'] = sectionlist.normalLeftAmountSum;
          }
          this.itemCount = sectionlist.total;

        }
        if (sectionlist.rows.length > 0) {
          // this.cachedData.push(...Array.from(sectionlist.rows));
          this.cachedData.splice((page - 1) * this.pageSize, this.pageSize, ...Array.from(sectionlist.rows));
          this.dataStream.next(this.cachedData);
        }
      });
  }
}
