import { Component, ElementRef, Input, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  @Input() label: string = '';
  @Input() content: string = '';
  @Input() placement: string = 'top';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    $(this.el.nativeElement).popover({
      title: this.label,
      content: this.content,
      trigger: 'hover',
      html: true
    });
  }
}
