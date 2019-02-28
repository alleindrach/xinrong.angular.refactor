import { PopupComponent } from "./popup.component";
import { EventEmitter , Input, Output} from '@angular/core';
import { NgElement, WithProperties } from "@angular/elements";
export interface  IPopupComponent{
    data : any;
    onElementInit(element:NgElement &
        WithProperties<IPopupComponent>);
}