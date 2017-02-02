import { ActivatedRoute, Router } from '@angular/router';
import { AnswerApi, PersonApi } from '../../../lib/loopback-sdk/services';
import { Component, OnInit } from '@angular/core';
import { LocalStorage, StorageProperty } from 'h5webstorage';

import { Answer } from '../../../lib/loopback-sdk/models';
import _ from 'lodash';

export interface TestScorePageParams {
  id: string
}

@Component({
  selector: 'page-test-score',
  templateUrl: 'score.html'
})
export class TestScorePage implements OnInit {
  pageReady: Boolean = false;
  routeParams: TestScorePageParams;
  answer: Answer;

  @StorageProperty() grids: any;
  @StorageProperty() legends: any;
  @StorageProperty() values: Array<any> = [];

  constructor(
    private answerApi: AnswerApi,
    private localStorage: LocalStorage,
    private person: PersonApi,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    const vm = this;

    this.route.params.subscribe((v) => {
      this.routeParams = <TestScorePageParams>v;
    });

    this.answer = <Answer>await this.answerApi.findById(this.routeParams.id, {
      include: [
        {
          relation: 'packageSchedule',
          scope: {
            include: [
              {
                relation: 'package',
                scope: {
                  include: ['questions']
                }
              }
            ]
          }
        },
        {
          relation: "answerCheats",
          scope: {
            order: "created_at asc"
          }
        },
        {
          relation: 'answerItems'
        }
      ]
    }).toPromise();

    const questions = [];
    _.each(this.answer.questionIds, questionId => {
      questions.push(_.find(this.answer.packageSchedule.package.questions, { id: questionId }));
    });
    const words = _.map(questions, question => {
      return question.answer;
    });
    const clues = _.map(questions, question => {
      return question.question;
    });
    const ids = _.map(questions, question => {
      return question.id;
    });
    this.grids = this.answer.grids;
    this.legends = CrosswordUtils.getLegend(words, clues, ids, this.grids);

    _.each(_.range(this.grids.length), r => {
      this.values[r] = [];
      _.each(_.range(this.grids[r].length), c => {
        this.values[r][c] = null;
      });
    });

    _.each(this.legends, (records, type) => {
      _.each(records, cell => {
        const answer = _.find(this.answer.answerItems, { question_id: cell.id });
        if (!answer.answered) {
          return;
        }
        let directions = [];
        switch (type) {
          case 'down':
            directions = _.range(cell.startRow, cell.endRow + 1);
            _.each(directions, (d, idx) => {
              _.set(this.values, `${d}[${cell.startCol}]`, answer.answered[idx]);
            });
            break;
          case 'across':
            directions = _.range(cell.startCol, cell.endCol + 1);
            _.each(directions, (d, idx) => {
              _.set(this.values, `${cell.startRow}[${d}]`, answer.answered[idx]);
            });
            break;
        }
      });
    });

    this.pageReady = true;
  }

  getCellValue(r, c) {
    return _.get(this.values, `${r}[${c}]`);
  };

  getCellRemark(cell) {
    const answer = _.find(this.answer.answerItems, { question_id: cell.id });
    if (!_.get(answer, 'answered')) {
      return -1;
    }
    return answer.remark;
  };

  getCellTruth(cell) {
    const answer = _.find(this.answer.answerItems, { question_id: cell.id });
    if (!answer) {
      return false;
    }
    return _.get(answer, 'answered') === cell.word;
  };

  async finish() {
    await this.person.logout().toPromise();
    this.router.navigateByUrl('/test/finish');
  }
}
