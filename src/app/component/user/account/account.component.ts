import { Component, OnInit } from '@angular/core';
import { AuxService } from '../../../service/aux/aux.service';
import { MemberService } from '../../../service/member/member.service';
import { LocalstorageService } from '../../../service/db/localstorage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Session } from '../../../model/session';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  insession = false;
  constructor(private memberService: MemberService, private auxService: AuxService, private db: LocalstorageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.memberService.insession$().subscribe(
      (result: Session) => {
        if (result.state === '0') {
          this.insession = true;
        }

      }
    );
  }

}
