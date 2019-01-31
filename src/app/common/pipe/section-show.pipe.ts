import { Pipe, PipeTransform } from '@angular/core';
import { Section } from '../../model/section';
import { Utilities } from '../../common/utilities';

@Pipe({
  name: 'sectionShow'
})
export class SectionShowPipe implements PipeTransform {

  transform(loan: Section): string {
    const progress = Utilities.toCent(loan.raisedAmount / loan.amount * 100, 0);
    const amount = Utilities.toCent(loan.amount / 10000, 2);
    const leftAmount = Utilities.toCent((loan.amount - loan.raisedAmount) / 10000, 2);
    let deadline = loan.deadlineStr;
    const flag = loan.flag;
    let color = '';
    let btnTxt;
    let btnClass;
    let hrefValueBtn = '/invest/' + loan.id;
    const hrefValue = '/biddetail/' + loan.id;
    const reward = loan.reward;
    const pathname = window.location.pathname; // 获取当前路径名
    const refundTypeHtml = Utilities.loanType2Name(loan.refundType);
    // 对于从项目列表跳转的页面带一个tab列参数 返回时用于点击事件
    /*if(pathname.lastIndexOf("/projectlist.html")>-1){
        hrefValueBtn="project.html?sid="+loan.id+"&tab="+type;
        hrefValue="project.html?sid="+loan.id+"&tab="+type;
    }*/

    let stimeView = '';
    if (loan.flag === 1 && Number(progress) < 100) {
      color = 'style="color:#6ac74f;"';
      btnTxt = '100元起投';
      btnClass = 'sub02';
      hrefValueBtn = '/invest/' + loan.id;
      // 对于从项目列表跳转的页面带一个tab列参数 返回时用于点击事件
      /*if(pathname.lastIndexOf("/projectlist.html")>-1){
          hrefValueBtn="projectpay2.0_01.html?sid="+loan.id+"&tab="+type;
      }*/
    } else if (flag === 2 || Number(progress) === 100) {
      btnTxt = '已投满';
      btnClass = 'sub03';
      hrefValueBtn = 'javascript:void(0)';
    } else if (flag === 0) {
      btnTxt = '未开始';
      btnClass = 'sub03';
      hrefValueBtn = 'javascript:void(0)';
      stimeView = '<input id="stime" type="hidden" value="' + loan.stime + '" />';
    }

    // 添加1-xx
    let computeLength = 1;
    if (deadline.indexOf('月') > -1) {
      for (let i = 0; i < deadline.length; i++) {
        if (!/^[0-9]+[0-9]*]*$/.test(deadline[i])) {
          computeLength = i;
          break;
        }
      }
    }
    deadline = deadline.replace('个月', '<span>个月</span>')
      .replace('天', '<span>天</span>');
    let rewardHtml = '';
    if (reward > 0 && loan.sectionType === 0 && flag !== 2) {
      rewardHtml = '<span class="reward">+' + (reward * 12 / loan.conDeadline).toFixed(2) + '%</span>';
    }
    const titleInfo = Utilities.loanTitleInfo(loan);
    /* if(type == 2){
         View_Loan.checkDanbaoActiveTime(function(){
             titleInfo += '<i class="fan">返</i>&nbsp;';
         });
     }*/
    let timeTip = '<p>期限</p>';
    if (loan.overdueTransfer === 1) {
      timeTip = '<p class="red">逾期时间</p>';
    }
    const html = `<div class="bid_box ">
                    <h1>${titleInfo}</h1>
                    <ul>
                        <li>
                            <h2>${loan.rate}<span>%</span>${rewardHtml}</h2>
                            <p>往期年化</p>
                        </li>
                        <li class="w02">
                            <h3>${deadline}</h3>
                            ${timeTip}
                        </li>
                        <div class="clearfix"></div>
                    </ul>
                    <div class="pro_sub">
                      <a href="${hrefValue}" class="investBtn"></a>
                      <a id="showCountDownTime" href="${hrefValueBtn}" class="investBtn ${btnClass} ">${btnTxt}</a>
                    </div>${stimeView}
                    <div class="box_font">
                      <span class="left">剩余金额:<b>${leftAmount}万元</b></span>
                      <span class="right">回款方式: <b>${refundTypeHtml}</b></span>
                    </div>
                </div>`;
    return html;
  }

}
