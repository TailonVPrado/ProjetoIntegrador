import { Component, Input, OnInit } from '@angular/core';
import { Properties } from 'src/app/models/interface/properties.model';

@Component({
  selector: 'list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.scss']
})
export class ListBoxComponent implements OnInit {

  constructor() { }

  @Input() isGrid: boolean = false;
  @Input() properties: Properties | undefined;
  @Input() list : string[] = []

  ngOnInit(): void {
    console.log(this.list);
  }


}
