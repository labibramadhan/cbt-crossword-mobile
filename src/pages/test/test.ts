import 'moment-duration-format';

import { ActivatedRoute, Router } from '@angular/router';
import { Answer, PackageSchedule } from '../../lib/loopback-sdk/models';
import { AnswerApi, PackageScheduleApi, PersonApi } from '../../lib/loopback-sdk/services';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { LocalStorage, StorageProperty } from 'h5webstorage';

import { AlertController } from 'ionic-angular';
import { LoopBackAuth } from '../../lib/loopback-sdk/services';
import { TestValidator } from '../../services/test-validator';
import { TranslateService } from 'ng2-translate';
import _ from 'lodash';
import moment from 'moment';

export interface TestPageParams {
  code: string
}

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage implements OnInit, DoCheck {

  pageReady: Boolean = false;
  routeParams: TestPageParams;
  tickingTime: any;
  timeUp: Boolean = false;
  halfTime: Boolean = false;
  timeCounter: any = 0;
  schedule: PackageSchedule;

  @ViewChild('timer') timerEl: any;
  @ViewChild('timerSpacer') timerSpacerEl: any;

  @StorageProperty() dirty: any = false;
  @StorageProperty() grids: any;
  @StorageProperty() legends: any;
  @StorageProperty() questionIds: any;
  @StorageProperty() timeElapsed: number = 0;
  @StorageProperty() cheats: Array<any> = [];
  @StorageProperty() values: Array<any> = [];
  @StorageProperty() remarks = {
    accross: [],
    down: []
  };

  constructor(
    private alertCtrl: AlertController,
    private answer: AnswerApi,
    private localStorage: LocalStorage,
    private loopbackAuth: LoopBackAuth,
    private packageSchedule: PackageScheduleApi,
    private person: PersonApi,
    private route: ActivatedRoute,
    private router: Router,
    private testValidator: TestValidator,
    private translate: TranslateService,
  ) { }

  ngDoCheck() {
    if (this.timerSpacerEl && this.timerEl) {
      this.timerSpacerEl.nativeElement.setAttribute('style', `height: ${this.timerEl._elementRef.nativeElement.offsetHeight}px`);
    }
  }

  async ngOnInit() {
    const vm = this;

    if (
      this.grids &&
      this.legends &&
      this.values &&
      !this.questionIds
    ) {
      this.localStorage.removeItem('grids');
      this.localStorage.removeItem('legends');
      this.values = [];
    }

    this.route.params.subscribe((v) => {
      this.routeParams = <TestPageParams>v;
    });

    try {
      await this.testValidator.validateCode(this.routeParams.code, this.loopbackAuth.getCurrentUserId());
    } catch (errorCode) {
      await this.person.logout();
      this.router.navigateByUrl('/');
      return;
    }

    this.schedule = <PackageSchedule>await this.packageSchedule.findOne({
      where: {
        code: this.routeParams.code,
      },
      include: [{
        relation: 'package',
        scope: {
          include: ['questions'],
        },
      }]
    }).toPromise();

    let ids;
    let cw;
    let words;
    let clues;

    if (!this.grids && !this.legends) {
      let questions = _.shuffle(_.shuffle(this.schedule.package.questions)).slice(0, this.schedule.questionTotal);

      words = _.map(questions, (question) => {
        return question.answer;
      });

      clues = _.map(questions, (question) => {
        return question.question;
      });

      ids = this.questionIds = _.map(questions, (question) => {
        return question.id;
      });

      cw = new Crossword(words, clues);
    }

    this.grids = this.grids ? this.grids : cw.getSquareGrid(100);
    if (!this.grids) {
      localStorage.removeItem('grids');
      location.reload(false);
      return;
    }

    this.legends = this.legends ? this.legends : CrosswordUtils.getLegend(words, clues, ids, this.grids);
    if (this.legends['across'].length + this.legends['down'].length !== this.schedule.questionTotal) {
      localStorage.removeItem('grids');
      localStorage.removeItem('legends');
      location.reload(false);
      return;
    }

    if (this.schedule.package.sanction && this.schedule.package.sanctionTrigger > 0) {
      let cheatStart;
      document.addEventListener('pause', () => {
        cheatStart = Date.now();
      });

      document.addEventListener('resume', () => {
        const cheatEnd = Date.now();
        const cheatDuration = cheatEnd - cheatStart;
        if (cheatDuration >= vm.schedule.package.sanctionTrigger * 1000) {
          vm.cheats.push({
            sanction: vm.schedule.package.sanction,
            duration: cheatDuration
          });
        }
      });
    }

    let gridNumber = 1;
    _.each(_.range(this.grids.length), (r) => {
      _.each(_.range(vm.grids[r].length), (c) => {
        if (!_.has(vm.values, `${r}[${c}]`)) _.set(vm.values, `${r}[${c}]`, null);
        let cell = vm.grids[r][c];
        if (cell !== null && ((cell['across'] && cell['across']['is_start_of_word']) || (cell['down'] && cell['down']['is_start_of_word']))) {
          vm.grids[r][c].number = gridNumber;
          gridNumber++;
        }
      });
    });

    let startTime = moment(new Date(this.schedule.start));
    let endTime = moment(new Date(this.schedule.end));
    let duration = endTime.diff(startTime);
    let startTest = startTime;
    const tickTime = async () => {
      if (!vm.timeUp) {
        const serverTimeQuery = await vm.packageSchedule.currentTime().toPromise();
        const serverTime = serverTimeQuery.time;
        const currentMs = moment(serverTime).diff(startTest);
        const leftTime = duration - currentMs;
        if (leftTime < 0) {
          vm.timeUp = true;
          clearInterval(vm.tickingTime);
          setTimeout(() => { vm.finish() }, 3000);
          return;
        } else {
          vm.timeUp = false;
        }
        vm.timeElapsed++;
        vm.halfTime = leftTime < (duration / 2);
        vm.timeCounter = moment.duration(leftTime, 'ms');
        vm.timeCounter = vm.timeCounter.format('HH:mm:ss', {
          trim: false,
        });
      }
    };
    tickTime();
    this.tickingTime = setInterval(tickTime, 1000);

    this.pageReady = true;
  };

  reset() {
    clearInterval(this.tickingTime);

    this.localStorage.removeItem('values');
    this.localStorage.removeItem('cheats');
    this.localStorage.removeItem('remarks');
    this.localStorage.removeItem('grids');
    this.localStorage.removeItem('legends');
    this.localStorage.removeItem('questionIds');
    this.localStorage.removeItem('dirty');
    this.localStorage.removeItem('timeElapsed');
  }

  getCellRemark(cell) {
    return _.has(this.remarks, `${cell.type}[${cell.position}]`) ? this.remarks[cell.type][cell.position] : -1;
  };

  getCellValue(cell) {
    const vm = this;
    let value = '';
    let length = 0;
    switch (cell.type) {
      case 'down':
        {
          let rows = _.range(cell.startRow, cell.endRow + 1);
          length = rows.length;
          _.each(rows, (row) => {
            if (vm.values[row][cell.startCol]) {
              value += vm.values[row][cell.startCol];
            }
          });
        }
        break;
      case 'across':
        {
          let cols = _.range(cell.startCol, cell.endCol + 1);
          length = cols.length;
          _.each(cols, (col) => {
            if (vm.values[cell.startRow][col]) {
              value += vm.values[cell.startRow][col];
            }
          });
        }
        break;
    }
    if (value.length < length) {
      value = '';
    }
    return value;
  };

  setCellValue(cell, value, remark, init = false) {
    const vm = this;
    let directions = [];
    switch (cell.type) {
      case "down":
        directions = _.range(cell.startRow, cell.endRow + 1);
        break;
      case "across":
        directions = _.range(cell.startCol, cell.endCol + 1);
        break;
    }
    _.each(directions, (direction, idx) => {
      let off1, off2;
      switch (cell.type) {
        case "down":
          off1 = direction;
          off2 = cell.startCol;
          break;
        case "across":
          off1 = cell.startRow;
          off2 = direction;
          break;
      }
      if ((!_.get(vm.values, `${off1}[${off2}]`) && value !== "undefined") || !init) {
        let passToModify = true;
        if (!init && (value === '' || value === null)) {
          const cells = CrosswordUtils.findLegendByCell(vm.legends, off1, off2, cell);
          _.each(cells, c => {
            const cellValue = vm.getCellValue(c);
            if (/[a-z]+/.test(cellValue)) {
              passToModify = false;
            }
          });
        }
        if (passToModify) {
          if ((init && (value !== null && value !== '')) || !init) {
            vm.values[off1][off2] = value === null ? null : value[idx];
          }
        }
      }
    });
    if (!init) {
      this.dirty = true;
      if (remark >= 0) {
        _.set(this.remarks, `${cell.type}[${cell.position}]`, remark);
      } else {
        delete this.remarks[cell.type][cell.position];
      }
    } else {
      _.set(this.remarks, `${cell.type}[${cell.position}]`, remark);
    }
  };

  fillByEvent(event) {
    if (_.has(event, 'number')) {
      this.fill(event.number);
    }
  }

  async fill(number, forceDirection = false) {
    if (this.timeUp) return;

    const cells = CrosswordUtils.findLegendByNumber(this.legends, number);

    if (cells.length > 1) {
      if (forceDirection) {
        const find = _.find(cells, (cell) => {
          return cell.type == forceDirection;
        });
        this.fillCell(find);
      } else {
        const confirmDirection = this.alertCtrl.create({
          title: this.translate.instant('confirm.test.fill.title', { number }),
          message: this.translate.instant('confirm.test.fill.description'),
          buttons: [
            {
              text: this.translate.instant('button.down'),
              handler: () => {
                const findDown = _.find(cells, (cell) => {
                  return cell.type == 'down';
                });
                this.fillCell(findDown);
              }
            },
            {
              text: this.translate.instant('button.across'),
              handler: () => {
                const findAcross = _.find(cells, (cell) => {
                  return cell.type == 'across';
                });
                this.fillCell(findAcross);
              }
            }
          ]
        });
        await confirmDirection.present();
      }
    } else {
      this.fillCell(cells[0]);
    }
  };

  async fillCell(cell) {
    const title = `No. ${cell.position}`;
    const alertFill = this.alertCtrl.create({
      title,
      subTitle: this.translate.instant(`test.${cell.type}`),
      message: `<div><div>${cell.clue}</div><p><strong>(${cell.word.length} ${this.translate.instant('character')})</strong></p></div>`,
      cssClass: 'test-fill-cell',
      inputs: [
        {
          name: 'answer',
          placeholder: this.translate.instant('prompt.test.fill.fill'),
          value: this.getCellValue(cell)
        }
      ],
      buttons: [
        {
          text: '',
          cssClass: 'answer-destroy',
          handler: data => {
            this.setCellValue(cell, null, -1);
          }
        },
        {
          text: '',
          cssClass: 'answer-hesitate',
          handler: (data) => {
            data.answer = _.trim(data.answer);
            if (data.answer && data.answer.length === cell.word.length) {
              this.setCellValue(cell, data.answer, 0);
            }
          }
        },
        {
          text: '',
          cssClass: 'answer-confidence',
          handler: data => {
            data.answer = _.trim(data.answer);
            if (data.answer && data.answer.length === cell.word.length) {
              this.setCellValue(cell, data.answer, 1);
            }
          }
        }
      ]
    });
    await alertFill.present();
  }

  buildAnswer() {
    const vm = this;
    const answers = [];
    _.each(this.legends, type => {
      _.each(type, cell => {
        const value = vm.getCellValue(cell);
        const remark = vm.getCellRemark(cell);

        answers.push({
          answered: value,
          correct: value.toString().toUpperCase() == cell.word.toString().toUpperCase(),
          remark: remark,
          question_id: cell.id
        });
      });
    });
    return answers;
  };

  async finishConfirm() {
    const finishConfirm = this.alertCtrl.create({
      title: this.translate.instant('confirm.test.finish.title'),
      message: this.translate.instant('confirm.test.finish.description'),
      buttons: [
        {
          text: this.translate.instant('button.cancel'),
          role: 'cancel'
        },
        {
          text: this.translate.instant('button.finish'),
          handler: () => {
            this.finish();
          }
        }
      ]
    });

    await finishConfirm.present();
  };

  finish = async () => {
    const vm = this;

    const answers = vm.buildAnswer();

    let grade: any = 0;
    const rate = 100 / answers.length;

    const answeredCount = await vm.answer.count({
      created_by: vm.loopbackAuth.getCurrentUserId(),
      packageSchedule_id: vm.schedule.id
    }).toPromise();

    if (!answeredCount.count) {
      const answerCreated = <Answer>await vm.answer.create({
        grade: grade,
        grids: vm.grids,
        packageSchedule_id: vm.schedule.id,
        duration: vm.timeElapsed * 1000,
        questionIds: vm.questionIds
      }).toPromise();
      for (const answer of answers) {
        if (answer.correct) {
          grade += rate;
        }
        await vm.answer.createAnswerItems(answerCreated.id, _.extend(answer, { answer_id: answerCreated.id })).toPromise();
      }
      for (const cheat of vm.cheats) {
        grade = grade + cheat.sanction;
        vm.answer.createAnswerCheats(answerCreated.id, _.extend(cheat, { answer_id: answerCreated.id }))
      }
      grade = parseFloat((Math.round(grade * 100) / 100).toString()).toFixed(2);

      vm.reset();

      await vm.answer.updateAttributes(answerCreated.id, _.extend(answerCreated, { grade })).toPromise();
      if (vm.schedule.showGrade) {
        vm.router.navigateByUrl(`/test/score/${answerCreated.id}`);
      } else {
        vm.router.navigateByUrl('/test/finish');
      }
    }
  };
}
