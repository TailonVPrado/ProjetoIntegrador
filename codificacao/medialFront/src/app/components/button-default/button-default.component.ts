import { Component, Input } from '@angular/core';
import { ButtonModel } from 'src/app/models/interface/button.model';

@Component({
  selector: 'button-default',
  templateUrl: './button-default.component.html',
  styleUrls: ['./button-default.component.scss']
})
export class ButtonDefaultComponent {

  @Input() properties : ButtonModel | undefined;
  @Input() hint :string | undefined;
}
