/* tslint:disable */
import {
  Person,
  Question,
  PackageSchedule
} from '../index';

declare var Object: any;
export interface PackageInterface {
  id?: string;
  name: string;
  sanction?: number;
  sanctionTrigger?: number;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  person?: Person;
  questions?: Array<Question>;
  schedules?: Array<PackageSchedule>;
}

export class Package implements PackageInterface {
  id: string;
  name: string;
  sanction: number;
  sanctionTrigger: number;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  person: Person;
  questions: Array<Question>;
  schedules: Array<PackageSchedule>;
  constructor(data?: PackageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Package`.
   */
  public static getModelName() {
    return "Package";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Package for dynamic purposes.
  **/
  public static factory(data: PackageInterface): Package{
    return new Package(data);
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
      name: 'Package',
      plural: 'Packages',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        sanction: {
          name: 'sanction',
          type: 'number',
          default: 0
        },
        sanctionTrigger: {
          name: 'sanctionTrigger',
          type: 'number',
          default: 0
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
        questions: {
          name: 'questions',
          type: 'Array<Question>',
          model: 'Question'
        },
        schedules: {
          name: 'schedules',
          type: 'Array<PackageSchedule>',
          model: 'PackageSchedule'
        },
      }
    }
  }
}
