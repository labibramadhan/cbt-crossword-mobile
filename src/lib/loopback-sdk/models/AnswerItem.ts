/* tslint:disable */
import {
  Answer,
  Question,
  Person
} from '../index';

declare var Object: any;
export interface AnswerItemInterface {
  id?: string;
  answered?: string;
  remark?: number;
  correct: boolean;
  answer_id?: string;
  question_id?: string;
  answerItem_id?: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  answer?: Answer;
  question?: Question;
  person?: Person;
}

export class AnswerItem implements AnswerItemInterface {
  id: string;
  answered: string;
  remark: number;
  correct: boolean;
  answer_id: string;
  question_id: string;
  answerItem_id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  answer: Answer;
  question: Question;
  person: Person;
  constructor(data?: AnswerItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AnswerItem`.
   */
  public static getModelName() {
    return "AnswerItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AnswerItem for dynamic purposes.
  **/
  public static factory(data: AnswerItemInterface): AnswerItem{
    return new AnswerItem(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'AnswerItem',
      plural: 'AnswerItems',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        answered: {
          name: 'answered',
          type: 'string'
        },
        remark: {
          name: 'remark',
          type: 'number'
        },
        correct: {
          name: 'correct',
          type: 'boolean'
        },
        answer_id: {
          name: 'answer_id',
          type: 'string'
        },
        question_id: {
          name: 'question_id',
          type: 'string'
        },
        answerItem_id: {
          name: 'answerItem_id',
          type: 'string'
        },
        created_at: {
          name: 'created_at',
          type: 'Date'
        },
        updated_at: {
          name: 'updated_at',
          type: 'Date'
        },
        created_by: {
          name: 'created_by',
          type: 'string'
        },
      },
      relations: {
        answer: {
          name: 'answer',
          type: 'Answer',
          model: 'Answer'
        },
        question: {
          name: 'question',
          type: 'Question',
          model: 'Question'
        },
        person: {
          name: 'person',
          type: 'Person',
          model: 'Person'
        },
      }
    }
  }
}
