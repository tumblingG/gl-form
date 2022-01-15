import {FormConfig, FormConfigItemInterface} from '../config';
import {FormGroup, FormControl, AbstractFormControl} from '../abstract-form';
import {validatorProxy} from './validator-proxy';

export class FormFactoryService {
  uiMap: Map<string, FormConfigItemInterface> = new Map();

  create(config: FormConfig, parentPath = ''): FormGroup {
    const formGroupOptions: {[key: string]: AbstractFormControl} = {};
    config.forEach(item => {
      this.checkValid(item);
      const {name, defaultValue = null, validators, children} = item;
      const path = `${parentPath}${parentPath ? '.' : ''}${name}`;
      if (Array.isArray(children)) {
        // is FormGroup
        formGroupOptions[name] = this.create(children, path);
      } else {
        // is control
        let proxyValidators;
        if (Array.isArray(validators)) {
          proxyValidators = validators.map(validatorItem => validatorProxy(validatorItem))
        }
        formGroupOptions[name] = new FormControl(defaultValue, proxyValidators);
        this.uiMap.set(path, item);
      }
    });
    return new FormGroup(formGroupOptions);
  }

  getFlatConfig(): Array<{path: string; configItem: FormConfigItemInterface}> {
    const arr: Array<{path: string; configItem: FormConfigItemInterface}> = [];
    for (const [key, value] of this.uiMap.entries()) {
      arr.push({
        path: key,
        configItem: value
      })
    }
    return arr;
  }

  getConfigByPath(path: string) {
    const config = this.uiMap.get(path);
    if (config) {
      return config;
    } else {
      throw new Error(`can't find config by path: ${path}`);
    }
  }

  private checkValid(configItem: FormConfigItemInterface) {
    const {name, widget, children} = configItem;
    if (!name || (!widget && children)) {
      throw new Error('config is not valid');
    }
  }
}

