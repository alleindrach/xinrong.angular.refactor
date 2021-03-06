import { Injectable } from '@angular/core';
import { IStore } from './istore';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService implements IStore {

  public localStorage: any;

  constructor() {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.localStorage = localStorage;
  }

  public set(key: string, value: any): void {
    this.localStorage[key] = value;
  }

  public get(key: string): any {
    return this.localStorage[key] || false;
  }

  public setObject(key: string, value: any): void {
    this.localStorage[key] = JSON.stringify(value);
  }

  public getObject(key: string): any {
    return JSON.parse(this.localStorage[key] || '{}');
  }

  public remove(key: string): any {
    this.localStorage.removeItem(key);
  }


}
