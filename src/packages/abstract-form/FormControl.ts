import {AbstractFormControl} from './AbstractFormControl';
import {Validator, ValidatorError} from './Validators';

interface FormControlInterface {
  setValue(value: any): void;
}

export class FormControl extends AbstractFormControl implements FormControlInterface {
  errors: ValidatorError | null = null;

  constructor(defaultValue: any, validators: Array<Validator> | null = null) {
    super();
    this.name = name;
    this.validators = validators;
    this.setValue(defaultValue);
  }

  get isGroup() {
    return false;
  }

  setValue(value: any): AbstractFormControl {
    this.checkValidate(value);
    this.value = value;
    this.triggerEvents('valueChange', value);
    return this;
  }

  checkValidate(value: any): boolean {
    if (this.validators) {
      for (const validator of this.validators) {
        const result = validator(value);
        if (result === null) {
          this.errors = null;
        } else {
          this.errors = result;
          break;
        }
      }
    } else {
      this.errors = null;
    }
    this.triggerEvents('errors', this.errors);
    return !this.errors;
  }

  setDirty(isDirty: boolean): AbstractFormControl {
    this.dirty = isDirty;
    this.triggerEvents('dirty', isDirty);
    return this;
  }

  setTouched(isTouched: boolean): AbstractFormControl {
    this.touched = isTouched;
    this.triggerEvents('touched', isTouched);
    return this;
  }

}
