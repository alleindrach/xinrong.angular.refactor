import { Component, OnInit, EventEmitter, Input, Output,ViewEncapsulation, ViewChild, AfterViewChecked, AfterContentInit } from "@angular/core";
import { IPopupComponent } from "../popup/popup.base";
import { NgElement, WithProperties } from "@angular/elements";
@Component({
  selector: "app-escrow-account",
  templateUrl: "./escrow-account.component.html",
  styleUrls: ["../dialog.scss","./escrow-account.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class EscrowAccountComponent implements OnInit, IPopupComponent {

  @ViewChild('dialogBoxWrapper') wrapper;
  @ViewChild('dialogBox') box;
  onElementInit(element: NgElement & WithProperties<IPopupComponent>) {
    console.log('onELementInit',element)
    
  }
  data: any;
  constructor() {}
  ngOnInit() {
     this.wrapper.nativeElement.style.height='400px';
  }

  @Output()
  closed = new EventEmitter();
}
