import { BaseSchema } from './fields/types/base.schema';
export interface GeneratorSchema extends Array<BaseSchema> {
  onSubmit: Function
};
