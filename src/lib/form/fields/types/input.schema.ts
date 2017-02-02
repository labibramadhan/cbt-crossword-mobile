import { BaseSchema } from './base.schema';

export interface InputSchema extends BaseSchema {
  placeholder?: string,
  opt: {
    type?: string,
    labelType?: string
  }
};
