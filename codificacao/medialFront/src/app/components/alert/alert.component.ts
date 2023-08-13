import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Output() mxSelect: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("btn1", { read: ElementRef, static: true }) btn1: ElementRef | undefined;
  @ViewChild("btn2", { read: ElementRef, static: true }) btn2: ElementRef | undefined;

  modalService: any;
  titulo: string | undefined;
  mensagem: string | undefined;
  labelBtn1: string | undefined;
  labelBtn2: string | undefined;

  result: Subject<Number> = new Subject<Number>();

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.btn2?.nativeElement.focus();
    });

  }

  close() {
    this.bsModalRef.hide();
  }

  clickButton(opcao: Number) {
    this.result.next( opcao );
    if (this.mxSelect) {
      this.mxSelect.emit(opcao);
    }
    this.close();
  }

  onKeyDown(event : KeyboardEvent){
    if(event.key == 'Tab'){
      event.preventDefault();
      if(this.btn2?.nativeElement == document.activeElement){
        this. btn1?.nativeElement.focus();
      }else{
        this.btn2?.nativeElement.focus();
      }
    }
  }

}
