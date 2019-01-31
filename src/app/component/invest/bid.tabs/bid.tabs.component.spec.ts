import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidTabsComponent } from './bid.tabs.component';

describe('BidTabsComponent', () => {
  let component: BidTabsComponent;
  let fixture: ComponentFixture<BidTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
