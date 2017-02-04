import { Component, EventEmitter, Input, Output } from '@angular/core';

import _ from 'lodash';

@Component({
  selector: 'crossword',
  template: `
  <table>
    <tr *ngFor="let row of range(grids.length); let idxRow = index; trackBy idxRow">
      <td crossword-cell *ngFor="let col of range(grids[row].length); let idxCol = index; trackBy idxCol"
        (colClick)="colClicked($event)"
        [reveal]="reveal"
        [cell]="grids[row][col] || null"
        [values]="values"
        [row]="row"
        [col]="col">
      </td>
    </tr>
  </table>
`
})
export class Crossword {
  range = _.range;

  @Input() reveal: any = false;
  @Input() grids: any;
  @Input() values: any;
  @Output() colClick: any = new EventEmitter();

  constructor() { }

  colClicked(event) {
    this.colClick.emit(event);
  }

}

@Component({
  selector: 'td[crossword-cell]',
  template: `
  <div (click)="cell && cell.number ? click(cell.number) : false" [attr.state]="!cell ? 'disabled' : 'enabled'">
    <span *ngIf="cell && cell.number" class="crossword-number">
      {{cell.number}}
    </span>
    <span class="crossword-char">
      <span *ngIf="values">
        {{values[row][col] || '&nbsp;'}}
      </span>
      <span *ngIf="reveal && cell && cell.char">
        {{cell.char}}
      </span>
    </span>
  </div>
  `
})
export class CrosswordCell {
  @Input() reveal: any;
  @Input() row: any;
  @Input() col: any;
  @Input() cell: any;
  @Input() values: any;
  @Output() colClick: any = new EventEmitter();

  constructor() { }

  click(number: Number) {
    this.colClick.emit({ number });
  }

}
