export type FormConfig = Array<FormConfigItemInterface>;
import { Validator } from './abstract-form';

export type WidgetType = 'input' | 'radio' | 'checkbox' | 'textarea' | 'select' | undefined;

export interface FormConfigItemInterface {
  name: string;
  label?: string;
  widget?: WidgetType;
  type?: string;
  options?: Array<{
    label: string;
    value: any;
  }>;
  ui: FormConfigItemUI;
  children?: FormConfig;
  defaultValue?: any;
  validators?: Array<{validator: Validator; message: string}>;
}

export interface FormConfigItemUI {
  span?: number;
  labelWidth?: string;
  hidden?: boolean;
  required?: boolean;
  onChange?: Function | null;
}
