export class Result {
    private _state: number;
    msg: string;
    get state():number{
        return Number(this._state);
    }
    set state(value:number){
        this._state=Number(value);
    }
}
