# Xinrong

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


1 架构和规则
1.1 全局的css拷贝到根目录下的styles.css文件中
1.2 页面集成
1.2.1 新建页面组件

      ng generate pagename

      生成的文件：

      src/app/pagename
                 |--pagename.component.css ----页面局部的css文件
                 |--pagename.component.html----页面的模板文件
                 |--pagename.component.spec.ts--页面的声明文件（不需要修改）
                 |--pagename.component.ts------页面的类脚本文件

1.2.2 增加路由
      src/app/app-routing/app-routing.module.ts 中修改

      const routes: Routes = [
       ...
       { path: 'path', component: PagenameComponent },
       ...
      ];
      
      修改pagename.component.html文件，文件最后增加<router-outlet></router-outlet>，否则该页不能被纳入路由区域。
1.2.3 css的集成
    页面局部的css拷贝到pagename.component.css文件里
    同时，注意修改pagename.component.ts文件里的视图封装模式为：

        @Component({
           ....
           encapsulation: ViewEncapsulation.None,
        })

    这样，编译时，会使用原始的html模版而不是加上ng-control前缀模版来配合css(参见：https://angular.cn/guide/component-styles#view-encapsulation)
1.2.4 和jquery的集成

    原则上，尽量不要使用jQuery，污染代码。

    npm install jquery --save
    这样在package.json 增加了一行依赖：

        "jquery": "^3.3.1",

    在angular.json增加：

       "scripts": [
             ....
              "./node_modules/jquery/dist/jquery.js",
             ....
            ]

    在引用jquery的页面脚本TypeScript 文件中增加导入：

        import * as $ from 'jquery';
    
    可以参考home.componenet.ts文件中的使用方法。

1.2.5 和原来使用的控件的集成，以首页的banner使用的 owl-carousel 滚动控件为例
    owl-carousel控件有开源代码的angular的集成包ngx-owl-carousel，可以到github上搜 ngx-owl-carousel
    按照其README做

1.2.6 访问后台服务
    用ng serve 启动项目调试时，如何访问后台数据？
    访问线上后台：
        配置environment.ts文件：

           export const environment = {
              ...
               baseUrl: 'https://www.xinrong.com'
           };

        这样，在访问接口时，就会跳转到baseUrl+apiUrl的地址
    其他方法可以参见 https://angular.cn/guide/build#proxying-to-a-backend-server

    注意，这里涉及到跨域访问CORS/CORB 的问题，注意以下几点

    浏览器调用后台接口时，如果Origin不同（protocol|domain|port)，则认为是跨域访问，
    假设当前的域为
        mydomain.com
    你需要访问
        www.xinrong.com
    的数据
    
    浏览器发送ajax请求时的origin是你当前页面的域，比如：

        GET /login.jso HTTP/1.1
        Host: www.xinrong.com
        Origin: http://mydomain.com
    
    服务器获取到请求后，检查Origin信息，如果是在允许范围内，返回的response的Access-Control-Allow-Origin头就会有附加上这个信息

        HTTP/1.1 200 OK  
        Access-Control-Allow-Origin: http://mydomain.com  
        Content-Type: application/json

    浏览器收到response后，会检查 Access-Control-Allow-Origin头里是否和request的内容一致，如果不一致，则浏览器会丢掉这个response并报警

    https://www.moesif.com/blog/technical/cors/Authoritative-Guide-to-CORS-Cross-Origin-Resource-Sharing-for-REST-APIs/

    可以使用moesif CORS 的chrome 扩展，模拟发出的request origin，修改返回的response的 Access-Control-Allow-Origin 来解决这个问题。

    要么就去修改server的nginx配置

    另外，涉及到跨域的访问，response的部分header也是无法访问的，比如response.getHeader['Date'] 

    原因1：W3C的 xhr 标准中做了限制，规定客户端无法获取 response 中的 Set-Cookie、Set-Cookie2这2个字段，无论是同域还是跨域请求；

    原因2：W3C 的 cors 标准对于跨域请求也做了限制，规定对于跨域请求，客户端允许获取的response header字段只限于“simple response header”和“Access-Control-Expose-Headers” （两个名词的解释见下方）
    https://segmentfault.com/a/1190000004322487
    关于CORB，参见 https://zhuanlan.zhihu.com/p/43630627
    解决的方法 https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome

    
    两种调用ajax的方式
    angular.commo.httpclient
        https://angular.cn/guide/http

    rxjs/ajax
        
    1.2.7 页面模版

       数据绑定两种方式：
           模版插值表达式

               <a href="{{sectionloan.name}}"/>

           属性表达式

               <a [href]='sectionloan.name'/>

       显示隐藏

             <ng-container *ngIf="operatTime"></ng-container>
             operatTime 是组件的属性，<ng-container>并不出现在dom中
             参见 https://angular.cn/guide/structural-directives

       列表循环

             <ul>
                <li *ngFor="let announcement of announcements;let i = index"><a [href]="announcement.href">{{announcement.title}}</a></li>
             </ul>

        定时器

          timer(1000, 1000).pipe(
            takeWhile(tick => new Date().getTime() / 1000 < this.hotSectionLoan.stime)
          ).subscribe(
            x => {
              this.sectionTimer = this.auxService.timeDiff(this.hotSectionLoan.stime, null);
              console.log('min:', this.sectionTimer.min, 'sec', this.sectionTimer.sec);
            },
            undefined,
            () => {
              this.sectionTimer = null;
              this.hotSectionLoan.flag = 1;
            }
          );

       管道 
          ng generate pipe pipename

2 使用ui库

https://material.angular.cn/guide/getting-started
    css换为 scss
    ng config schematics.@schematics/angular:component.styleext scss
    https://www.jianshu.com/p/3259976b414b

3 使用js库
    angular.json 增加scripts
    package.json webpack要增加依赖 npm install xxx --save
    tsconfig.json ...

    将遗留的js拷贝到src/assets/legacy目录下
    angular.json  增加 scripts
    "scripts": [
             ...
              "src/assets/legacy/rsa.js"
            ]
    在使用到的ts头部增加：
        declare var RSA: any;
3 发布
       ng build --prod
       生成到 dist 目录中。


4 启动
4.1 内置命令
    ng serve
4.2 依照package.json 的scripts 字段 命令
    npm start
4.3 依照angular.json的 配置
    ng run <project>:<architect>[:configurations] [其他配置]
    如  ng run xinrong:serve

5 自定义元素（custom element） OR 动态组件（Dynamic Component）
自定义元素用的是ES2015中的custom elements规范，需要浏览器的支持，同时，TS的编译目标也要指向ES2015。
html页面上的<custom-element>是有浏览器向注册表中查询已注册的元素构建脚本（由angular生成），最终进入angular脚本。
注意，自定义元素的tag名字必须有 - 中划线。

而动态组件是利用TS的接口，在运行时实例化组件接口的实际子类，插入到view树中。模版文件中的<custom-component-tag>标签是由angular插入的动态组件。

参见：
自定义元素：https://www.angular.cn/guide/elements

动态组件:https://www.angular.cn/guide/dynamic-component-loader

具体实现可以参见popup.component 和popup.service 的实现。

自定义元素来:

app.module.ts 的metadata中增加：
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

需要在页面加载时向浏览器注册，这个在account.component.ts的构造函数中：
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(PopupComponent, { injector });
    // Register the custom element with the browser.
    customElements.define("popup-element", PopupElement);
    
这样，就可以在html中增加一个自定义元素:
    <popup-element message='hello world!' id='helloworld' closed='document.body.removeChild(this)'></popup-element>

    事件绑定需要代码动态绑定：

    const x=document.getElementById('helloworld') as any;
    x.addEventListener(
    closed',()=>alert('triggered!')
    );

    页面静态形式的似乎不起作用：
    <popup-element message='hello world!' id='helloworld' closed='alert()'></popup-element>


当然，也可以动态创建：
  // This uses the new custom-element method to add the popup to the DOM.
    showAsElement(message: string) {
      // Create element
      const popupEl: NgElement &
        WithProperties<PopupComponent> = document.createElement(
        "popup-element"
      ) as any;

      // Listen to the close event
      popupEl.addEventListener("closed", () =>
        document.body.removeChild(popupEl)
      );

      // Set the message
      popupEl.message = message;

      // Add to the DOM
      document.body.appendChild(popupEl);
    }

APPENDIX
A 配置文件说明
A.a tsconfig.json 
typescript 编译器配置
https://angular.cn/guide/typescript-configuration
A.b package.json
webpack配置项
npm install --save 的项目都记录在此
A.c angular.json
angular的配置项
包含生产环境/开发环境的配置文件的替换
"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ],
    ...

B angular的依赖注入
https://www.bbsmax.com/A/gVdn0YQJWl/

C 代理配置，假设将angular的app集成到原有网站的ng目录下
nginx 配置：
        location ^~ /ng/ {
                proxy_connect_timeout       20s;
                proxy_read_timeout          30s;
                proxy_http_version 1.1;
                proxy_set_header Connection "";
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#                proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
                proxy_intercept_errors on;
                proxy_pass http://127.0.0.1:4200/;
        }
        下面是为live-reload的配置
        location ^~ /sockjs-node/ {
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_http_version 1.1;
                proxy_cache_bypass $http_upgrade;
                proxy_pass http://127.0.0.1:4200/sockjs-node/;
        }
注意：这里的location 使用了 ^~ 匹配，这样就不会再遍历正则匹配项,参见https://segmentfault.com/a/1190000002797606

angular配置：index.html
  <base href="/ng/">


https://nathanfriend.io/2018/05/14/live-reloading-an-angular-2-app-behind-nginx.html


问题：
1、 对于大文件，出现的ERR_CONTENT_LENGTH_MISMATCH错误
这是，因为nginx会将大的文件存到cache目录里，如果nginx的当前用户对这个目录没有访问权限就会出错。
解决方法有几种，这里，直接关掉缓存
nginx配置文件加上：proxy_buffering off;

D、UI库
https://github.com/angular/material2
https://clarity.design/documentation/get-started




