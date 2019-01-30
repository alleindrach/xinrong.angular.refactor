import { DecimalPipe } from '@angular/common';
import { Section } from './service/invest/section';

export class Utilities {
   static toCent(value: number, precise: number): String {
      if (!Math.sign) {
         Math.sign = function (x: number) {
            return x >= 0 ? (x = 0 ? 0 : 1) : -1;

         };
      }

      return (Math.floor(Math.abs(value) * 100 + 0.00001) * Math.sign(value) / 100).toFixed(precise);
   }



   static loanType2Name(loanType: number, conSn?: string): string {
      let loanTypeStr = '';
      try {
         if (loanType === 1) {
            loanTypeStr = '信·无忧贷';
         } else if (loanType === 2) {
            loanTypeStr = '信·优企贷';
         } else if (loanType === 3) {
            loanTypeStr = '信·赎楼贷';
         } else if (loanType === 4 || loanType === 7 || loanType === 11) {
            loanTypeStr = '信·消费贷';
         } else if (loanType === 5) {
            loanTypeStr = '信·精选贷';
         } else if (loanType === 6) {
            loanTypeStr = '信·质抵贷';
         } else if (loanType === 8) {
            loanTypeStr = '品·融360';
         } else if (loanType === 9) {
            loanTypeStr = '品·吉屋网' + conSn.substring(3, 9) + '系列';
         } else if (loanType === 10) {
            loanTypeStr = '信·优资贷';
         } else if (loanType === 12) {
            loanTypeStr = '品·保理贷';
         } else if (loanType === 13) {
            loanTypeStr = '品·分期X';
         } else if (loanType === 14) {
            loanTypeStr = '信·消费JS';
         } else if (loanType === 15) {
            loanTypeStr = '品·票据贷';
         } else if (loanType === 16) {
            // let type_name = conSn.substring(1, 3);
            loanTypeStr = '信·车贷';
         } else if (loanType === 17) {
            loanTypeStr = '品·明特';
         }
      } catch (e) {
      }
      return loanTypeStr;
   }
   static loanType2ShowName(loanType: number, conSn: string) {

      let loanTypeStr = '';

      try {

         if (loanType === 1) {
            loanTypeStr = '信·无忧贷' + conSn.substring(3, 9) + parseInt(conSn.substring(10), 10) + '系列';
         } else if (loanType === 2) {
            loanTypeStr = '信·优企贷' + conSn.substring(3, 9) + parseInt(conSn.substring(10), 10) + '系列';
         } else if (loanType === 3) {
            loanTypeStr = '信·赎楼贷' + conSn.substring(3, 9) + parseInt(conSn.substring(10), 10) + '系列';
         } else if (loanType === 4 || loanType === 7 || loanType === 11) {
            loanTypeStr = '信·消费' + conSn.substring(1, 3) + '-' + conSn.substring(3, 9) + '系列';
         } else if (loanType === 5) {
            loanTypeStr = '信·精选贷' + conSn.substring(3, 9) + parseInt(conSn.substring(10), 10) + '系列';
         } else if (loanType === 6) {
            loanTypeStr = '信·质抵贷' + conSn.substring(3, 9) + parseInt(conSn.substring(10), 10) + '系列';
         } else if (loanType === 8) {
            loanTypeStr = '品·融360-' + conSn.substring(3, 9) + '系列';
         } else if (loanType === 9) {
            loanTypeStr = '品·吉屋网' + conSn.substring(3, 9) + '系列';
         } else if (loanType === 10) {
            loanTypeStr = '信·优资贷' + conSn.substring(3, 9) + parseInt(conSn.substring(10), 10) + '系列';
         } else if (loanType === 12) {
            loanTypeStr = '品·保理贷' + conSn.substring(3, 9) + parseInt(conSn.substring(10), 10) + '系列';
         } else if (loanType === 13) {
            loanTypeStr = '品·分期X-' + conSn.substring(3, 9) + '系列';
         } else if (loanType === 14) {
            loanTypeStr = '信·消费JS-' + conSn.substring(3, 9) + '系列';
         } else if (loanType === 15) {
            loanTypeStr = '品·票据贷' + conSn.substring(3, 9) + '系列';
         } else if (loanType === 16) {
            loanTypeStr = '信·车贷' + conSn.substring(1, 3) + '-' + conSn.substring(3, 9) + '系列';
         } else if (loanType === 17) {
            loanTypeStr = '品·明特-' + conSn.substring(3, 9) + '系列';
         }

      } catch (e) {

      }

      return loanTypeStr;
   }
   // 计算两个时间相差（时间单位为秒）
   static timeDiff(begin_time: number, now_time?: number): Object {
      if (!now_time) {
         now_time = (new Date().getTime() / 1000);
      }
      let _second = Math.round(begin_time - now_time);

      if (_second < 0) {
         return null;
      }
      let _day = _second / (24 * 60 * 60);
      _day = Math.floor(_day); 				// 相差的总天数
      _second = _second - _day * 24 * 60 * 60; 	// 抛去相差天数后的秒数
      let _hour = (_second / (60 * 60));
      _hour = Math.floor(_hour); 			    // 相差的小时数
      _second = _second - _hour * 60 * 60;  	// 抛去相差小时后的秒数
      let _min = _second / 60;
      _min = Math.floor(_min); 				// 相差的分钟数
      _second = _second - _min * 60; 			// 抛去相差分钟后的秒数
      const _sec = _second;
      const result = new Object();
      result['day'] = _day;
      result['hour'] = _hour;
      result['min'] = _min;
      result['sec'] = _sec;

      return result;
   }
   static loanTypeSort(loanType: number, conSn: string, sort?: string): string {
      if (loanType in [4, 7, 11, 8, 9, 13, 15, 16, 17]) {
         return conSn.substr(10, 4);
      } else {
         return sort;
      }

   }
   static loanTitleInfo(loan: Section, type?: number): string {
      let html = '';
      const title = Utilities.loanType2ShowName(loan.loanType, loan.conSn);
      html += title;
      if (loan.sectionType === 0) {
         const sort = Utilities.loanTypeSort(loan.loanType, loan.conSn, loan.sort.toString());
         html += '之' + sort;
         if (loan.escrowDirect !== 1 && loan.escrowFlag === 1) {
            loan['IsRestrict'] = 1;
         }
      } else {
         html += '转让';
      }
      if ((type && type === 1) ||
         (loan.loanType in [8, 9, 12, 13, 15])
      ) {
         if (loan.enterId !== 62167) {
            html += '<i class="danbao" title="第三方公司本息担保">担保</i>';
         }
      } else {
         if (loan.enterId !== 62167) {
            html += '<i class="danbao" title="第三方公司本息担保">担保</i>';
         } else {
            if (loan.loanType !== 6 && loan.loanType !== 5 && loan.loanType !== 16) {
               // html+='<i class="danbao" title="质保专款垫付">备</i>';
            } else {
               if (loan.loanType === 6 || loan.loanType === 16) {
                  html += '<i class="danbao" title="">押</i>';
               }
            }
         }
      }
      if (loan.sectionType === 1) {
         html += '<i class="zhuan" title="此项目为转让项目">转</i>';
      }

      if (loan.autoInvest === 0) {
         html += '<i class="shouxian" title="仅限手动投资且不超过1万元">手限</i>';
      }

      if (loan.sectionType === 0 && loan.flag !== 2 && Number(loan.reward) > 0) {
         html += '<i class="jiang">奖</i>';
      }
      if (loan.escrowFlag === 1) {
         html += '<i class="escrow" title="仅限存管账户投资">存管</i>';
      }
      if (loan.transferReward > 0) {
         html += '<i class="jiang">返</i>';
      }
      if (loan.escrowDirect === 1) {
         html += '<i class="zhitou" title="可用普通账户资金投资">直投</i>';
      }
      if (loan.f8 != null && loan.f8 > 0) {
         html += '<i class="one_to_one"><img src="../../images/1b1.png"></i>';
      }
      if (true) {
         html += '<i class="fengxian" title="项目等级分为：AAA、AA、A、BBB、BB、B、CCC、CC、C、DDD、DD、D，从AAA到D风险依次上升。">AA</i>';
      }
      /*  if(!loan.transferOrnot &&loan.onlineLoanType == 2){
            View_Loan.checkDanbaoActiveTime(function(){
                html += '<i class="fan">返</i>';
            })
        }*/
      return html;
   }
}
