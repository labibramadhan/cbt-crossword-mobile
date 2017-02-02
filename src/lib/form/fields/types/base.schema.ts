export interface BaseSchema {
  key: string,
  type: string,
  label?: string,
  default?: string,
  validators?: Array<Function>
};
