import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { MemberService } from "src/app/service/member/member.service";
import { Observable } from "rxjs";
import { AuxService } from "src/app/service/aux/aux.service";
import { environment } from "src/environments/environment";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { Result } from "../../../model/result";
import { User } from "../../../model/user";
import { LocalstorageService } from "src/app/service/db/localstorage.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Validators } from "@angular/forms";
declare var RSA: any;
// import * as NodeRSA from '@types/node-rsa';
@Component({
  selector: "app-login-resp",
  templateUrl: "./login-resp.component.html",
  styleUrls: ["./login-resp.component.scss"]
})
export class LoginRespComponent implements OnInit {
  @ViewChild("ctlcaptcha") ctlCaptcha;
  username = new FormControl("", [Validators.required]);
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(16)
  ]);
  captcha = new FormControl("");

  seed: number;
  captchaUrl: string;
  submitted = false;
  formValid = true;
  errorMessage = "";
  redirectUrl = "/account";
  failedTimes = 0;

  constructor(
    private memberService: MemberService,
    private auxService: AuxService,
    private db: LocalstorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  isLoginFailTooMuch = false;

  ngOnInit() {
    this.memberService.loginFailTooMuch$().subscribe(tooMuch => {
      this.isLoginFailTooMuch = tooMuch;
      if (this.isLoginFailTooMuch) {
        this.refreshCaptcha();
      }
    });
    
    this.route.queryParamMap.subscribe(p => {
      this.redirectUrl = p.get("redirect");
      if (!this.redirectUrl) {
        this.route.parent.url.subscribe(u => {
          this.redirectUrl = u.toString();
        });
      }
    });
  }
  // validate(): boolean {
  //   if (this.username.trim().length === 0) {
  //     this.errorMessage = "请输入账号";
  //     this.formValid = false;
  //     return false;
  //   }
  //   if (this.password.trim().length === 0) {
  //     this.errorMessage = "请输入登录密码";
  //     this.formValid = false;
  //     return false;
  //   }
  //   if (this.seed > 0 && this.captcha.trim().length === 0) {
  //     this.errorMessage = "请输入验证码";
  //     this.formValid = false;
  //     return false;
  //   }
  //   if (this.password.length < 6 || this.password.length > 16) {
  //     this.errorMessage = "登录密码必须为6-16个字符";
  //     this.formValid = false;
  //     return false;
  //   }
  //   if (this.seed > 0) {
  //     if (this.captcha.length !== 4) {
  //       this.errorMessage = "验证码必须为4个字符";
  //       this.formValid = false;
  //       return false;
  //     }
  //   }
  //   this.formValid = true;
  //   return true;
  // }
  onSubmit(loginForm: NgForm) {
    this.submitted = true;
    // if (
    //   this.validate()
    // )
    {
      const encryptedPassword = this.auxService.encryptPw(this.password.value);
      this.memberService
        .login$(
          this.username.value,
          String(encryptedPassword),
          this.captcha.value,
          this.seed
        )
        // .pipe(
        //   map
        // )
        .subscribe((result: Result) => {
          if (Number(result.state) === 0) {
            this.memberService.getBaseInfo$().subscribe((user: User) => {
              if (user.state === 0) {
                this.db.setObject(User.TAG, user);
              }
              this.router.navigateByUrl(this.redirectUrl);
            });
          } else {
            const msg = result.msg;
            this.failedTimes = parseInt(
              msg.substring(msg.indexOf("登录失败次数：") + 7),
              10
            );
            if (this.failedTimes >= 3 || Number(result.state) === 2010) {
              this.isLoginFailTooMuch = true;
              this.refreshCaptcha();
              this.captcha.setValidators(
                [Validators.required,
                Validators.minLength(4),
                Validators.maxLength(4)]
              );
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
    this.auxService.getServerTime$().subscribe(time => {
      this.seed = time;
      this.captchaUrl = `${environment.baseUrl}/v2/login/get_captcha.raw?seed=${
        this.seed
      }`;
    });
  }
}
