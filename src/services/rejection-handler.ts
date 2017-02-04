import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import _ from 'lodash';

@Injectable()
export class RejectionHandler {
  constructor(private toast: ToastController, private translate: TranslateService) { }

  show(err) {
    let errorMessage;
    if (_.has(err, 'details')) {
      errorMessage = [];
      _.each(err.details.messages,
        function (message, field) {
          _.each(message, (m) => {
            errorMessage.push(field + ' ' + m);
          });
        });
      errorMessage = errorMessage.join(', ');
    } else if (_.has(err, 'message')) {
      errorMessage = err.message;
    } else if (err.data === null) {
      errorMessage = this.translate.instant('error');
    } else if (_.isString(err)) {
      errorMessage = this.translate.instant(err);
    }

    if (!_.isUndefined(errorMessage)) {
      const toast = this.toast.create({
        message: `Error: ${errorMessage}`,
        duration: 4000,
        position: 'bottom'
      });

      toast.present();
    }
  };
}
