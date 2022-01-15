import {AbstractFormControl} from './AbstractFormControl';
import {Validator, ValidatorError} from './Validators';

interface FormGroupInterface {
  getControl(path: string): any;
}

export class FormGroup extends AbstractFormControl implements FormGroupInterface {
  private controlsMap: Map<string, AbstractFormControl> = new Map();
  readonly controls: Array<AbstractFormControl> = [];

  value: Record<string, any> = {};
  errors: {[key: string]: ValidatorError} | null = null;
  oldErrors: {[key: string]: ValidatorError} | null = null;

  constructor(controls: {[key: string]: AbstractFormControl}, validators: Array<Validator> | null = null) {
    super();
    this.validators = validators;

    for (const key of Object.keys(controls)) {
      const control = controls[key];
      control.name = key;
      this.controls.push(control);
      this.controlsMap.set(key,  control);
      this.initListener(control);
    }
    this.collectValue();
  }

  get isGroup() {
    return true;
  }

  private initListener(control: AbstractFormControl) {
    control.on('valueChange', (value, childControl) => {
      this.value[childControl.name] = value;
      // this.checkValidate(this.value);
      this.triggerEvents('valueChange', this.value);
    });

    control.on('errors', (errors, control) => {
      if (errors === null) {
        if (this.errors) {
          if (!control.isGroup) {
            delete this.errors[control.name];
          } else {
            const oldErrors = (control as FormGroup).oldErrors;
            if (oldErrors) {
              for (const key of Object.keys(oldErrors)) {
                delete this.errors[key];
              }
            }
          }
          if (!Object.keys(this.errors).length) {
            this.errors = null;
          }
        }
      } else {
        !this.errors && (this.errors = {});
        if (control.isGroup) {
          Object.assign(this.errors, errors);
        } else {
          this.errors[control.name] = errors;
        }
      }
      this.triggerEvents('errors', this.errors);
      this.oldErrors = this.errors ? Object.assign({}, this.errors) : this.errors;
    });

    control.on('dirty', (value) => {
      this.dirty = value;
      this.triggerEvents('dirty', this.dirty);
    });

    control.on('touched', (value) => {
      this.touched = value;
      this.triggerEvents('touched', this.touched);
    });
  }

  getControl(path = ''): AbstractFormControl | null {
    if (!path) return this;

    const pathArr = path.split('.');
    let controls = this.controls;
    let control;

    while (pathArr.length) {
      const tempPath = pathArr.shift();
      control = controls.find(item => item.name === tempPath) as FormGroup;
      if (control) {
        controls = control.controls;
      } else {
        throw new Error(`can't find control for ${tempPath}`)
      }
    }
    return control as AbstractFormControl;
  }

  setValue(value: any): AbstractFormControl {
    if (value === null || typeof value !== 'object') {
      throw new Error('value must be an object');
    }
    for (const key of Object.keys(value)) {
      const control = this.controlsMap.get(key);
      if (control) {
        control.setValue(value[key]);
      } else {
        console.warn(`can't find control named ${key}`);
      }
    }
    return this;
  }

  checkValidate(value: any): boolean {
    if (this.validators) {
      for (const validator of this.validators) {
        const result = validator(value);
        if (result === null) {
          if (this.errors) {
            delete this.errors[this.name]
            if (!Object.keys(this.errors).length) {
              this.errors = null;
            }
          }
        } else {
          this.errors && (this.errors = {});
          this.errors![this.name] = result;
          break;
        }
      }
    }
    this.triggerEvents('errors', this.errors);
    return !!this.errors;
  }

  setDirty(isDirty: boolean): AbstractFormControl {
    this.controls.forEach(control => {
      control.setDirty(isDirty);
    });
    return this;
  }

  setTouched(isTouched: boolean): AbstractFormControl {
    this.controls.forEach(control => {
      control.setDirty(isTouched);
    });
    return this;
  }

  private collectValue() {
    this.controls.forEach(control => {
      control.triggerEvents('errors', control.errors);
      control.triggerEvents('valueChange', control.value);
    })
  }
}
