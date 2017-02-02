/* tslint:disable */
import {
  Answer,
  Person
} from '../index';

declare var Object: any;
export interface AnswerCheatInterface {
  id?: string;
  duration: number;
  sanction: number;
  answer_id?: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  answer?: Answer;
  person?: Person;
}

export class AnswerCheat implements AnswerCheatInterface {
  id: string;
  duration: number;
  sanction: number;
  answer_id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  answer: Answer;
  person: Person;
  constructor(data?: AnswerCheatInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AnswerCheat`.
   */
  public static getModelName() {
    return "AnswerCheat";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AnswerCheat for dynamic purposes.
  **/
  public static factory(data: AnswerCheatInterface): AnswerCheat{
    return new AnswerCheat(data);
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
      name: 'AnswerCheat',
      plural: 'AnswerCheats',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        duration: {
          name: 'duration',
          type: 'number'
        },
        sanction: {
          name: 'sanction',
          type: 'number'
        },
        answer_id: {
          name: 'answer_id',
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
        person: {
          name: 'person',
          type: 'Person',
          model: 'Person'
        },
      }
    }
  }
}
