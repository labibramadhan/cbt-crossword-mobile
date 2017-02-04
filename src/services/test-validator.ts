import { AnswerApi, PackageScheduleApi } from '../lib/loopback-sdk/services';

import { CBTError } from '../lib/custom/CBTError';
import { Injectable } from '@angular/core';
import { LocalStorage } from 'h5webstorage';
import Moment from 'moment';
import { PackageSchedule } from '../lib/loopback-sdk/models';
import { TranslateService } from 'ng2-translate';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

@Injectable()
export class TestValidator {
  constructor(
    private answer: AnswerApi,
    private localStorage: LocalStorage,
    private packageSchedule: PackageScheduleApi,
    private translate: TranslateService
  ) { }

  async validateCode(code: string, userId: string) {
    let packageSchedule = <PackageSchedule[]>await this.packageSchedule.find({
      where: {
        code: code
      },
      include: [{
        relation: 'package',
        scope: {
          include: ['questions']
        }
      }]
    }).toPromise();
    if (packageSchedule.length) {
      const schedule = packageSchedule[0];
      const start = new Date(schedule.start);
      const end = new Date(schedule.end);
      var range = moment.range(start, end);
      if (!range.contains(new Date())) {
        const err = new CBTError(111);
        throw this.translate.instant(err.key);
      } else if (schedule.package.questions.length < 5) {
        const err = new CBTError(112, {
          total: schedule.package.questions.length
        });
        throw this.translate.instant(err.key);
      } else {
        const answerCount = <{ count: Number }>await this.answer.count({
          packageSchedule_id: schedule.id,
          created_by: userId
        }).toPromise();
        if (answerCount.count) {
          const err = new CBTError(113);
          throw this.translate.instant(err.key);
        }
      }
    } else {
      const err = new CBTError(114);
      throw this.translate.instant(err.key);
    }
  };
}
