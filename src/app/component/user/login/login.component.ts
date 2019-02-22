import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MemberService } from 'src/app/service/member/member.service';
import { Observable } from 'rxjs';
import { AuxService } from 'src/app/service/aux/aux.service';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { Result } from '../../../model/result';
import { User } from '../../../model/user';
import { LocalstorageService } from 'src/app/service/db/localstorage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
declare var RSA: any;
// import * as NodeRSA from '@types/node-rsa';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('ctlcaptcha') ctlCaptcha;
  @Input() username = '';
  @Input() password = '';
  @Input() captcha = '';
  seed: number;
  captchaUrl: string;
  submitted = false;
  formValid = true;
  errorMessage = '';
  redirectUrl = '/account';
  failedTimes = 0;

  constructor(private memberService: MemberService, private auxService: AuxService, private db: LocalstorageService,
    private route: ActivatedRoute,
    private router: Router) { }
  isLoginFailTooMuch = false;

  ngOnInit() {
    this.memberService.loginFailTooMuch$().subscribe(
      tooMuch => {
        this.isLoginFailTooMuch = tooMuch;
        if (this.isLoginFailTooMuch) {
          this.refreshCaptcha();
        }
      }
    );

    this.route.paramMap.subscribe(p => {
      this.redirectUrl = (p.get('redirect'));
      if (!this.redirectUrl) {
        this.route.parent.url.subscribe(u => {
          this.redirectUrl = u.toString();
        });
      }
    });
  }
  validate(): boolean {
    if (this.username.trim().length === 0) {
      this.errorMessage = '请输入账号';
      this.formValid = false;
      return false;
    }
    if (this.password.trim().length === 0) {
      this.errorMessage = '请输入登录密码';
      this.formValid = false;
      return false;
    }
    if (this.seed > 0 && this.captcha.trim().length === 0) {
      this.errorMessage = '请输入验证码';
      this.formValid = false;
      return false;
    }
    if (this.password.length < 6 || this.password.length > 16) {
      this.errorMessage = '登录密码必须为6-16个字符';
      this.formValid = false;
      return false;
    }
    if (this.seed > 0) {
      if (this.captcha.length !== 4) {
        this.errorMessage = '验证码必须为4个字符';
        this.formValid = false;
        return false;
      }
    }
    this.formValid = true;
    // const rsaInst = NodeRSA;
    // rsaInst.importKey(
    //   {
    //     n: Buffer.from(`bafdbbf02c2da5125a921e59d4f5b3cdfb96172b8f75f2736
    //     b843ad78fb6d9cabc0fb64147c7b5a531f713123ff6dc33dc904f700a25c932e9a
    //     1d0bfdf5d3b609d6456c82922a54c75a085b0f117c7e1031acc33683895bf84b92
    //     1acdd7df0f776694c3ef38d4cc27cd30feb4d90268179f5b1a789234f96cc14c70a2627f1a1`,
    //       'hex'),
    //     e: 0x10001
    //   }, 'components');
    // const encryptedPassword = rsaInst.encrypt(this.password, undefined, undefined);
    return true;
  }
  onSubmit(loginForm: NgForm) {
    this.submitted = true;
    if (this.validate()) {
      const encryptedPassword = this.auxService.encryptPw(this.password);
      this.memberService.login$(this.username, String(encryptedPassword), this.captcha, this.seed)
        // .pipe(
        //   map
        // )
        .subscribe(
          (result: Result) => {
            if (result.state === '0') {
              this.memberService.getBaseInfo$().subscribe(
                (user: User) => {
                  if (user.state === 0) {
                    this.db.setObject(User.TAG, user);
                  }
                  this.router.navigateByUrl(this.redirectUrl);
                }
              );
            } else {
              const msg = result.msg;
              this.failedTimes = parseInt(msg.substring(msg.indexOf('登录失败次数：') + 7), 10);
              if (this.failedTimes >= 3 || result.state === '2010' ) {
                this.isLoginFailTooMuch = true;
                this.refreshCaptcha();
              } else {
                this.isLoginFailTooMuch = false;
              }
              this.errorMessage = result.msg;
              this.formValid = false;
            }
          });
    }
  }
  refreshCaptcha(): void {
    this.auxService.getServerTime$().subscribe(
      time => {
        this.seed = time;
        this.captchaUrl = `${environment.baseUrl}/v2/login/get_captcha.raw?seed=${this.seed}`;
      }
    );
  }

}
