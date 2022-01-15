import {WidgetType} from '../config';

export class RegisterService {
  widgetPaths: Map<WidgetType, () => Promise<any>> = new Map();

  getWidgetPath(name: WidgetType) {
    const path = this.widgetPaths.get(name);
    if (path) {
      return path;
    } else {
      throw new Error(`can't find ${name} widget.`);
    }
  }

  registerWidget(name: WidgetType, module: () => Promise<any>) {
    const widget = this.widgetPaths.get(name);
    if (!widget) {
      this.widgetPaths.set(name, module);
    } else {
      throw new Error(`${name} widget has been register.`);
    }
  }
}

export const registerService = new RegisterService();
