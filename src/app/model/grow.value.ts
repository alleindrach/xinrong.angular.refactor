import { Result } from './result';

export class GrowValue extends Result {
    autoVip:number;
    private _vipDeadLine:number;
    private _curGrowthValue:number;
    private _nextLevelGrowthValue:number;
    private _investOneMonthGrowthValue:number;
    private _investTwoMonthGrowthValue:number;
    curVip:number;
    get vipDeadLine():number{
        return Number(this._vipDeadLine?this._vipDeadLine:0);
    }
    set vipDeadLine(value:number){
        this._vipDeadLine=Number(value?value:0);
    }
    get curGrowthValue():number{
        return Number(this._curGrowthValue?this._curGrowthValue:0);
    }
    set curGrowthValue(value:number){
        this._curGrowthValue=Number(value?value:0);
    }

    get nextLevelGrowthValue():number{
        return Number(this._nextLevelGrowthValue?this._nextLevelGrowthValue:0);
    }
    set nextLevelGrowthValue(value:number){
        this._nextLevelGrowthValue=Number(value?value:0);
    }

    get investOneMonthGrowthValue():number{
        return Number(this._investOneMonthGrowthValue?this._investOneMonthGrowthValue:0);
    }
    set investOneMonthGrowthValue(value:number){
        this._investOneMonthGrowthValue=Number(value?value:0);
    }
    get investTwoMonthGrowthValue():number{
        return Number(this._investTwoMonthGrowthValue?this._investTwoMonthGrowthValue:0);
    }
    set investTwoMonthGrowthValue(value:number){
        this._investTwoMonthGrowthValue=Number(value?value:0);
    }

}
