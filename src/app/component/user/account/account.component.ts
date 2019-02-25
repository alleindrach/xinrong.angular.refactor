import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AuxService } from '../../../service/aux/aux.service';
import { MemberService } from '../../../service/member/member.service';
import { LocalstorageService } from '../../../service/db/localstorage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Session } from '../../../model/session';
import { Assets } from 'src/app/model/assets';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent implements OnInit {
  insession = false;
  showAccount = false;
  accounts = [
    {
      type: 'esw',
      name: '存管',
      class: 'card_one',
      balance: 0,
      avialBalance: 0
    },
    {
      type: 'leg',
      name: '普通',
      class: 'card_two',
      balance: '0',
      avialBalance: 0
    }
  ];
  @Input() accountOwlOptions = {
    center: true,
    items: 1,
    loop: false,
    nav: false,
    merge: true,
    margin: 10,
    dots: false,
    smartSpeed: 900,
    autoWidth: false,
    stagePadding: 20
  };
  constructor(private memberService: MemberService, private auxService: AuxService, private db: LocalstorageService,
    private route: ActivatedRoute,
    private router: Router) { }

  switchShow() {
    this.showAccount = !this.showAccount;
    this.db.set('isShowInAccount', this.showAccount);

  }
  ngOnInit() {
    this.showAccount = Boolean(this.db.get('isShowInAccount') === 'true');
    this.memberService.insession$().subscribe(
      (result: Session) => {
        if (Number(result.state) === 0) {
          this.insession = true;
        }
      }
    );
    this.memberService.assetOverview$().subscribe(
      (assets: Assets) => {
        if (Number(assets.state) === 0) {
          this.accounts[0].balance = Number(assets.eswAccountBalance) + Number(assets.eswEarningMoney);
          this.accounts[0].avialBalance = Number(assets.eswAvialBalance);
          this.accounts[1].balance = Number(assets.accountBalance) + Number(assets.rewardMoney)
            + Number(assets.earningMoney) + Number(assets.moneyWithdraw) + Number(assets.xcbTotalMoney);
          this.accounts[1].avialBalance = Number(assets.accountBalance);

        }
      }
    );
  }

}
