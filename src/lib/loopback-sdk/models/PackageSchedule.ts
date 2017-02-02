/* tslint:disable */
import {
  Package,
  Answer,
  Person
} from '../index';

declare var Object: any;
export interface PackageScheduleInterface {
  id?: string;
  code?: string;
  start: Date;
  end: Date;
  name: string;
  questionTotal: number;
  showGrade?: boolean;
  package_id?: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  package?: Package;
  answers?: Array<Answer>;
  person?: Person;
}

export class PackageSchedule implements PackageScheduleInterface {
  id: string;
  code: string;
  start: Date;
  end: Date;
  name: string;
  questionTotal: number;
  showGrade: boolean;
  package_id: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  package: Package;
  answers: Array<Answer>;
  person: Person;
  constructor(data?: PackageScheduleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PackageSchedule`.
   */
  public static getModelName() {
    return "PackageSchedule";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PackageSchedule for dynamic purposes.
  **/
  public static factory(data: PackageScheduleInterface): PackageSchedule{
    return new PackageSchedule(data);
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
      name: 'PackageSchedule',
      plural: 'PackageSchedules',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        code: {
          name: 'code',
          type: 'string'
        },
        start: {
          name: 'start',
          type: 'Date'
        },
        end: {
          name: 'end',
          type: 'Date'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        questionTotal: {
          name: 'questionTotal',
          type: 'number'
        },
        showGrade: {
          name: 'showGrade',
          type: 'boolean',
          default: false
        },
        package_id: {
          name: 'package_id',
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
        answers: {
          name: 'answers',
          type: 'Array<Answer>',
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
