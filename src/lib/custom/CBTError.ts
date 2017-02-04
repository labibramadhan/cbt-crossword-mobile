import _ from 'lodash';

export class CBTError {
  public key: string = '';

  dictionary = {
    111: 'error.package.schedule.inactive',
    112: 'error.package.schedule.unqualified',
    113: 'error.package.schedule.taken',
    114: 'error.package.schedule.notFound',
  };

  constructor(
    public code: Number,
    public data: any = {},
  ) {
    this.key = _.get(this.dictionary, code);
  }
}
