import {Validator, ValidatorError} from './Validators';

type ListenerCallBackType = (value: any, control: AbstractFormControl) => void;
type EventType = 'valueChange' | 'errors' | 'dirty' | 'touched'

export abstract class AbstractFormControl {
  name = '';
  value: any = null;

  dirty = false;
  touched = false;

  protected listenersMap: Map<string, Array<ListenerCallBackType>> = new Map();
  protected validators: Array<Validator> | null = null;
  errors: any | null = null;

  get isValid() {
    return this.errors !== null;
  }

  abstract get isGroup(): boolean;

  abstract setValue(value: any): AbstractFormControl;

  abstract setDirty(isDirty: boolean): AbstractFormControl;

  abstract setTouched(isTouched: boolean): AbstractFormControl;

  abstract checkValidate(value: any): boolean;

  on(type: EventType, callback: ListenerCallBackType): void {
    let listenerArr = this.listenersMap.get(type);
    if (!Array.isArray(listenerArr)) {
      listenerArr = [callback];
      this.listenersMap.set(type, listenerArr);
    } else {
      listenerArr.push(callback);
    }
  }

  off(type: EventType, callback: ListenerCallBackType): void {
    const listenerArr = this.listenersMap.get(type);
    if (Array.isArray(listenerArr)) {
      if (typeof callback === 'function') {
        const index = listenerArr.findIndex(item => item === callback);
        index !== -1 && listenerArr.splice(index, 1);
        if (listenerArr.length === 0) {
          this.listenersMap.delete(type)
        }
      } else {
        this.listenersMap.delete(type)
      }
    }
  }

  triggerEvents(type: EventType, value: any): void {
    const listenerArr = this.listenersMap.get(type);
    if (Array.isArray(listenerArr)) {
      listenerArr.forEach(fn => {
        fn(value, this);
      });
    }
  }

  hasValidator(validator: Validator): boolean {
    if (Array.isArray(this.validators)) {
      const index = this.validators.findIndex(item => item === validator);
      return index !== -1;
    }
    return false;
  }

  addValidator(validator: Validator) {
    if (Array.isArray(this.validators)) {
      if (!this.hasValidator(validator)) {
        this.validators.push(validator);
        this.checkValidate(this.value);
      }
    } else {
      this.validators = [validator];
      this.checkValidate(this.value);
    }
  }

  removeValidator(validator: Validator) {
    if (Array.isArray(this.validators)) {
      const index = this.validators.findIndex(item => item === validator);
      if (index !== -1) {
        this.validators.splice(index, 1);
        if (!this.validators.length) {
          this.validators = null;
        }
        this.checkValidate(this.value);
      }
    }
  }
}
