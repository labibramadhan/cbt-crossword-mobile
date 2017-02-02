/* tslint:disable */
import {
  Person,
  AnswerItem,
  PackageSchedule,
  AnswerCheat
} from '../index';

declare var Object: any;
export interface AnswerInterface {
  id?: string;
  grids: Array<any>;
  questionIds: Array<string>;
  grade: number;
  duration: number;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  packageSchedule_id?: string;
  person?: Person;
  answerItems?: Array<AnswerItem>;
  packageSchedule?: PackageSchedule;
  answerCheats?: Array<AnswerCheat>;
}

export class Answer implements AnswerInterface {
  id: string;
  grids: Array<any>;
  questionIds: Array<string>;
  grade: number;
  duration: number;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  packageSchedule_id: string;
  person: Person;
  answerItems: Array<AnswerItem>;
  packageSchedule: PackageSchedule;
  answerCheats: Array<AnswerCheat>;
  constructor(data?: AnswerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Answer`.
   */
  public static getModelName() {
    return "Answer";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Answer for dynamic purposes.
  **/
  public static factory(data: AnswerInterface): Answer{
    return new Answer(data);
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
      name: 'Answer',
      plural: 'Answers',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        grids: {
          name: 'grids',
          type: 'Array&lt;any&gt;'
        },
        questionIds: {
          name: 'questionIds',
          type: 'Array&lt;string&gt;'
        },
        grade: {
          name: 'grade',
          type: 'number'
        },
        duration: {
          name: 'duration',
          type: 'number'
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
        packageSchedule_id: {
          name: 'packageSchedule_id',
          type: 'string'
        },
      },
      relations: {
        person: {
          name: 'person',
          type: 'Person',
          model: 'Person'
        },
        answerItems: {
          name: 'answerItems',
          type: 'Array<AnswerItem>',
          model: 'AnswerItem'
        },
        packageSchedule: {
          name: 'packageSchedule',
          type: 'PackageSchedule',
          model: 'PackageSchedule'
        },
        answerCheats: {
          name: 'answerCheats',
          type: 'Array<AnswerCheat>',
          model: 'AnswerCheat'
        },
      }
    }
  }
}
