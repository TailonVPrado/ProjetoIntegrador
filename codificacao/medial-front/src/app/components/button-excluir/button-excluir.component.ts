import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-excluir',
  templateUrl: './button-excluir.component.html',
  styleUrls: ['./button-excluir.component.scss']
})
export class ButtonExcluirComponent {

  @Input() image : string | undefined;

}
