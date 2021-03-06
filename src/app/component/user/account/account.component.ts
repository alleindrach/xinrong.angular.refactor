import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Injector
} from "@angular/core";
import { AuxService } from "../../../service/aux/aux.service";
import { MemberService } from "../../../service/member/member.service";
import { LocalstorageService } from "../../../service/db/localstorage.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Session } from "../../../model/session";
import { Assets } from "src/app/model/assets";
import { PopupService } from "src/app/service/aux/popup.service";
import { PopupComponent } from "../../popup/popup/popup.component";
import { createCustomElement } from "@angular/elements";
import { AccountIndex } from "src/app/model/account.index";
import { GrowValue } from "src/app/model/grow.value";
import { EscrowAccountComponent } from "../../popup/escrow-account/escrow-account.component";
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss","../../popup/escrow-account/escrow-account.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {
  insession = false;
  showAccount = false;
  accountIndex: AccountIndex = null;
  growthInfo: GrowValue = null;
  accounts = [
    {
      type: "esw",
      name: "存管",
      class: "card_one",
      balance: 0,
      avialBalance: 0
    },
    {
      type: "leg",
      name: "普通",
      class: "card_two",
      balance: "0",
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
  constructor(
    private memberService: MemberService,
    private auxService: AuxService,
    private db: LocalstorageService,
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector,
    public popup: PopupService
  ) {
    // // Convert `PopupComponent` to a custom element.
    // const PopupElement = createCustomElement(PopupComponent, { injector });
    // // Register the custom element with the browser.
    // let popupElement = customElements.get("popup-element") as any;
    // if (!popupElement) customElements.define("popup-element", PopupElement);
  }

  switchShow() {
    this.showAccount = !this.showAccount;
    this.db.set("isShowInAccount", this.showAccount);
  }
  ngOnInit() {
    //   const x=document.getElementById('helloworld') as any;
    //   x.addEventListener(
    // 'closed',()=>alert('triggered!')
    // );
    this.showAccount = Boolean(this.db.get("isShowInAccount") === "true");
    this.memberService.insession$().subscribe((result: Session) => {
      if (Number(result.state) === 0) {
        this.insession = true;
      }
    });
    this.memberService.getAssetOverview$().subscribe((assets: Assets) => {
      if (Number(assets.state) === 0) {
        this.accounts[0].balance =
          Number(assets.eswAccountBalance) + Number(assets.eswEarningMoney);
        this.accounts[0].avialBalance = Number(assets.eswAvialBalance);
        this.accounts[1].balance =
          Number(assets.accountBalance) +
          Number(assets.rewardMoney) +
          Number(assets.earningMoney) +
          Number(assets.moneyWithdraw) +
          Number(assets.xcbTotalMoney);
        this.accounts[1].avialBalance = Number(assets.accountBalance);
      }
    });
    this.memberService
      .getAccountIndexInfo$()
      .subscribe((indexInfo: AccountIndex) => {
        if (Number(indexInfo.state) === 0) {
          this.accountIndex = indexInfo;
        } else {
          this.popup.showAsElement(
            this.injector,
            EscrowAccountComponent,
            "esw-account",
            {}
          );
        }
      });
    this.memberService.getVipGrowUpValue$().subscribe((grow: GrowValue) => {
      this.growthInfo = grow;
    });
  }
}
