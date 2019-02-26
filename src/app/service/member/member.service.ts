import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoginFail } from "../../model/loginfail";
import { Result } from "../../model/result";
import { User } from "src/app/model/user";
import { Session } from "src/app/model/session";
import { Assets } from "src/app/model/assets";

@Injectable({
  providedIn: "root"
})
export class MemberService {
  constructor(private http: HttpClient) {}
  loginFailTooMuch$(): Observable<boolean> {
    return this.http
      .get<LoginFail>(
        environment.baseUrl + "/v2/login/get_login_fail_times.jso"
      )
      .pipe(
        map((x: LoginFail) => {
          if (x.state === 0 && x.loginTimes && x.loginTimes > 0) {
            return true;
          }
          return false;
        })
      );
  }
  login$(
    username: string,
    password: string,
    captcha: string = null,
    seed: number = null
  ): Observable<Result> {
    return this.http
      .get<Result>(environment.baseUrl + "/v2/login/login.jso", {
        params: {
          username: username,
          password: password,
          captcha: captcha,
          seed: !seed ? "" : seed.toString()
        }
      })
      .pipe(
        map(result => {
          result.state = Number(result.state);
          return result;
        })
      );
  }
  insession$(): Observable<Session> {
    return this.http.get<Session>(
      environment.baseUrl + "/v2/login/in_session_data.jso"
    );
  }
  getBaseInfo$(): Observable<User> {
    return this.http.get<User>(
      environment.baseUrl + "/v2/member/get_base_info.jso"
    );
  }
  assetOverview$(): Observable<Assets> {
    return this.http.get<Assets>(
      environment.baseUrl + "/v2/escrow/get_asset_overview.jso"
    );
  }
}
