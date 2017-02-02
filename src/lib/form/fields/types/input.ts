import { Component, Input } from '@angular/core';

import { FormControl } from '@angular/forms';
import { InputSchema } from './input.schema';
import _ from 'lodash';

@Component({
  selector: 'field-type-input',
  template: `
    <ion-item no-padding>
      <ion-label *ngIf="schema.label && labelType === 'floating'" floating>
        {{schema.label | translate}}
      </ion-label>
      <ion-label *ngIf="schema.label && labelType === 'fixed'" fixed>
        {{schema.label | translate}}
      </ion-label>
      <ion-label *ngIf="schema.label && labelType === 'stacked'" stacked>
        {{schema.label | translate}}
      </ion-label>
      <ion-input [formControl]="control" [type]="type"></ion-input>
    </ion-item>
    <field-error [control]="control"></field-error>
  `
})
export class FieldTypeInput {
  @Input() schema: InputSchema;
  @Input() control: FormControl;

  get type() {
    return _.get(this, 'schema.opt.type', 'text');
  }
  get labelType() {
    return _.get(this, 'schema.opt.labelType', 'floating');
  }
}
