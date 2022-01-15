import {Validator} from '../abstract-form';

export function validatorProxy(validatorItem: {validator: Validator; message: string}) {
  return function (value: any) {
    const result = validatorItem.validator(value);
    return result === null ? result : {value: value, message: validatorItem.message};
  }
}
