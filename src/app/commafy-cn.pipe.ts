import { Pipe, PipeTransform } from '@angular/core';
import { merge } from 'rxjs';
import * as $ from 'jquery';
@Pipe({
  name: 'commafyCN'
})
export class CommafyCNPipe implements PipeTransform {

  transform(value: any, opt?: any): any {
    const options = opt;
    let n = options['precise'];
    // const option = args['options'];
    n = n >= 0 && n <= 20 ? n : 2;
    const s = parseFloat((value + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''; //精度
    const l = s.split('.')[0].split(''),
      r = s.split('.')[1];//remind
    let t = '';
    const defaultConf = {
      styleBegin: '<span>',
      styleEnd: '</span>',
      tenThousand: '万',
      hundredMillion: '亿',
      unit: '元',
      isTenThousandMode: false,
      styleMode: 0
    };
    if (options) {
      $.extend(defaultConf, options);
    }
    let CN_TEN_THOUSAND = defaultConf.tenThousand;
    let CN_HUNDRED_MILLION = defaultConf.hundredMillion;
    let CN_UNIT = defaultConf.unit;
    if (defaultConf.styleMode === 0) {
      CN_TEN_THOUSAND = defaultConf.styleBegin + defaultConf.tenThousand + defaultConf.styleEnd;
      CN_HUNDRED_MILLION = defaultConf.styleBegin + defaultConf.hundredMillion + defaultConf.styleEnd;
      CN_UNIT = defaultConf.styleBegin + defaultConf.unit + defaultConf.styleEnd;
    }

    if (l.length < 5) {
      if (defaultConf.styleMode === 1) {
        return s + defaultConf.styleEnd + CN_UNIT;
      } else {
        return s + CN_UNIT;
      }
    }
    for (let i = 0; i < l.length; i++) {
      if (defaultConf.styleMode === 1 && i === 0) {
        t = defaultConf.styleBegin + t;
      }
      if (i === (l.length - 9)) {
        if (defaultConf.styleMode === 1) {
          t += l[i] + defaultConf.styleEnd + CN_HUNDRED_MILLION + defaultConf.styleBegin;
        } else {
          t += l[i] + CN_HUNDRED_MILLION + '';
        }
      } else if (i === (l.length - 5)) {
        if (defaultConf.styleMode === 1) {
          t += l[i] + defaultConf.styleEnd + CN_TEN_THOUSAND;
        } else {
          t += l[i] + CN_TEN_THOUSAND + '';
        }

        if (defaultConf.isTenThousandMode) {
          return t;
        }

        t += defaultConf.styleBegin;
      } else {
        t += l[i];
      }
    }
    if (n === 0) {
      if (defaultConf.styleMode === 1) {
        t += defaultConf.styleEnd;
      }
      return t + CN_UNIT;
    } else {
      if (defaultConf.styleMode === 1) {
        return t + '.' + r + defaultConf.styleEnd + CN_UNIT;
      } else {
        return t + '.' + r + CN_UNIT;
      }
    }
    return null;
  }

}
