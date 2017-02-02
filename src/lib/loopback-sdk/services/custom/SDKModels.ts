/* tslint:disable */
import { Injectable } from '@angular/core';
import { Person } from '../../models/Person';
import { Question } from '../../models/Question';
import { Package } from '../../models/Package';
import { PackageQuestion } from '../../models/PackageQuestion';
import { Answer } from '../../models/Answer';
import { AnswerItem } from '../../models/AnswerItem';
import { PackageSchedule } from '../../models/PackageSchedule';
import { AnswerCheat } from '../../models/AnswerCheat';

interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Person: Person,
    Question: Question,
    Package: Package,
    PackageQuestion: PackageQuestion,
    Answer: Answer,
    AnswerItem: AnswerItem,
    PackageSchedule: PackageSchedule,
    AnswerCheat: AnswerCheat,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
