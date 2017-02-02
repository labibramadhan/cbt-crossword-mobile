/* tslint:disable */
import {
  Package,
  Question,
  Person
} from '../index';

declare var Object: any;
export interface PackageQuestionInterface {
  id?: string;
  package_id?: string;
  question_id?: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  package?: Package;
  question?: Question;
  person?: Person;
}

export class PackageQuestion implements PackageQuestionInterface {
  id: string;
  package_id: string;
  question_id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  package: Package;
  question: Question;
  person: Person;
  constructor(data?: PackageQuestionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PackageQuestion`.
   */
  public static getModelName() {
    return "PackageQuestion";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PackageQuestion for dynamic purposes.
  **/
  public static factory(data: PackageQuestionInterface): PackageQuestion{
    return new PackageQuestion(data);
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
      name: 'PackageQuestion',
      plural: 'PackageQuestions',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        package_id: {
          name: 'package_id',
          type: 'string'
        },
        question_id: {
          name: 'question_id',
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
        package: {
          name: 'package',
          type: 'Package',
          model: 'Package'
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
