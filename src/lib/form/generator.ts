import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BaseSchema } from './fields/types/base.schema';
import _ from 'lodash';

@Component({
  selector: 'form-generator',
  template: `
      <form [formGroup]="form" (ngSubmit)="onSubmit(form.valid, form.value)">
        <div padding-left padding-right>
          <div *ngFor="let schema of schemas; let i = index; trackBy: i">
            <field-type-input *ngIf="schema.type === 'input'" [schema]="schema" [control]="form.controls[schema.key]">
            </field-type-input>
          </div>
        </div>
        <div padding>
          <ng-content></ng-content>
        </div>
      </form>
    `
})
export class FormGenerator implements OnInit {
  form: FormGroup;
  @Input() schemas: Array<BaseSchema>;
  @Input() onSubmit: Function;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const groups = {};
    for (const schema of this.schemas) {
      groups[schema.key] = [
        _.get(schema, 'default', ''),
        ..._.get(schema, 'validators', [])
      ];
    }
    this.form = this.fb.group(groups);
  }
}
