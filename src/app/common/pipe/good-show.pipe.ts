import { Pipe, PipeTransform } from '@angular/core';
import { Good } from 'src/app/model/good';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from 'src/app/service/db/localstorage.service';
import { Utilities } from '../utilities';

@Pipe({
  name: 'goodShow'
})
export class GoodShowPipe implements PipeTransform {

  constructor(private db: LocalstorageService) {

  }
  transform(good: Good, args?: any): string {

    const score = Utilities.countVipScore(good.socre, this.db.get('VIP') ? Number(this.db.get('VIP')) : 0);

    const hrefStr = `/goods_detail/${good.id}`;
    const _html = `<a target="_blank" href=${hrefStr}>
                  <p><img src="${environment.storeImageBaseUrl}/gift/m_size/${good.imgSrc}"/></p>
                  <h2><span class="f-money">￥${good.money}</span><span class="f-jf">
                  ${score}</span></h2></a>`;
    return _html;
  }

}
