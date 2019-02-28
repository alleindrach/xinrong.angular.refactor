export class Result {
    private _state: number;
    msg: string;
    get state():number{
        return Number(this._state?this._state:0);
    }
    set state(value:number){
        this._state=Number(value?value:0);
    }
}
