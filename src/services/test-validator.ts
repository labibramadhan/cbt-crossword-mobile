import { AnswerApi, PackageScheduleApi } from '../lib/loopback-sdk/services';

import { CBTError } from '../lib/custom/CBTError';
import { Injectable } from '@angular/core';
import Moment from 'moment';
import { PackageSchedule } from '../lib/loopback-sdk/models';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

@Injectable()
export class TestValidator {
  constructor(
    private answer: AnswerApi,
    private packageSchedule: PackageScheduleApi
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
        throw new CBTError(111);
      } else if (schedule.package.questions.length < 5) {
        throw new CBTError(112, {
          length: schedule.package.questions.length
        });
      } else {
        const answerCount = <{ count: Number }>await this.answer.count({
          packageSchedule_id: schedule.id,
          created_by: userId
        }).toPromise();
        if (answerCount.count) {
          throw new CBTError(113);
        }
      }
    } else {
      throw new CBTError(114);
    }
  };
}
