/* tslint:disable */

declare var Object: any;
export interface PersonInterface {
  id?: string;
  name: string;
  realm?: string;
  username?: string;
  password: string;
  email: string;
  emailVerified?: boolean;
  verificationToken?: string;
  created_at: Date;
  updated_at: Date;
  accessTokens?: Array<any>;
}

export class Person implements PersonInterface {
  id: string;
  name: string;
  realm: string;
  username: string;
  password: string;
  email: string;
  emailVerified: boolean;
  verificationToken: string;
  created_at: Date;
  updated_at: Date;
  accessTokens: Array<any>;
  constructor(data?: PersonInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Person`.
   */
  public static getModelName() {
    return "Person";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Person for dynamic purposes.
  **/
  public static factory(data: PersonInterface): Person{
    return new Person(data);
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
      name: 'Person',
      plural: 'Persons',
      properties: {
        id: {
          name: 'id',
          type: 'string'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        realm: {
          name: 'realm',
          type: 'string'
        },
        username: {
          name: 'username',
          type: 'string'
        },
        password: {
          name: 'password',
          type: 'string'
        },
        email: {
          name: 'email',
          type: 'string'
        },
        emailVerified: {
          name: 'emailVerified',
          type: 'boolean'
        },
        verificationToken: {
          name: 'verificationToken',
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
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'Array<any>',
          model: ''
        },
      }
    }
  }
}
