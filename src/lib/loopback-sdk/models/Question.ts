/* tslint:disable */
import {
  Person
} from '../index';

declare var Object: any;
export interface QuestionInterface {
  id?: string;
  answer: string;
  question: string;
  tag: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  person?: Person;
}

export class Question implements QuestionInterface {
  id: string;
  answer: string;
  question: string;
  tag: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  person: Person;
  constructor(data?: QuestionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Question`.
   */
  public static getModelName() {
    return "Question";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Question for dynamic purposes.
  **/
  public static factory(data: QuestionInterface): Question{
    return new Question(data);
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
      name: 'Question',
      plural: 'Questions',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        answer: {
          name: 'answer',
          type: 'string'
        },
        question: {
          name: 'question',
          type: 'string'
        },
        tag: {
          name: 'tag',
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
        person: {
          name: 'person',
          type: 'Person',
          model: 'Person'
        },
      }
    }
  }
}
