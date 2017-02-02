import { Component, Input } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'field-error',
  template: `
    <div class="error-message" *ngIf="control.touched && control.hasError('required')">
      <ion-icon mode="ios" name="alert" color="danger"></ion-icon>
      {{'error.field.required' | translate}}
    </div>
  `
})
export class FieldError {
  @Input() control: FormControl;
}
