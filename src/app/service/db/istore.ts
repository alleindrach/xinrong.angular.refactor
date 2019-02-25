export interface IStore {
    set(key: string, value: any): void;
    get(key: string): any;
    setObject(key: string, value: any): void;
    getObject(key: string): any;
    remove(key: string): any;
}
