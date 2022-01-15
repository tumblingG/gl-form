<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import {FormGroup, AbstractFormControl} from '../abstract-form';
import ControlWrapper from './control-wrapper/control-wrapper.vue';
import {FormConfig, FormConfigItemInterface} from '../config';
import {FormFactoryService} from '../services/form-factory';
// import './widgets/index';
import CommonWidget from '../common/common-widget';

@Component({
  name: 'GlForm',
  components: {
    ControlWrapper
  }
})
export default class GlForm extends Vue {
  @Prop() config!: FormConfig;
  @Prop({default: 'top'}) labelPosition!: 'right' | 'left' | 'top';
  @Prop({default: '60px'}) labelWidth!: string;

  formGroup: FormGroup | null = null;
  flatConfig: Array<{path: string; configItem: FormConfigItemInterface}> = [];
  formFactory: FormFactoryService | null = null;
  controlMap: Map<string, CommonWidget> = new Map();

  value: any = null;

  get isValid(): boolean {
    return this.formGroup!.isValid;
  }

  get dirty(): boolean {
    return this.formGroup!.dirty;
  }

  get touched(): boolean {
    return this.formGroup!.touched;
  }

  get errors() {
    return this.formGroup!.errors;
  }

  get labelPositionClass (): string {
    return `fk-form-label-${this.labelPosition}`;
  }

  created(): void {
    this.formFactory = new FormFactoryService();
    this.formGroup = this.formFactory.create(this.config);
    this.flatConfig = this.formFactory.getFlatConfig();
    this.value = this.formGroup.value;
    this.initListener();
  }

  @Emit('onValueChange')
  onValueChange(value: any) {
    return value;
  }

  setValue(value: any): void {
    this.formGroup!.setValue(value);
  }

  reset(): void {
    this.formGroup!.setDirty(false);
    this.formGroup!.setTouched(false);
  }

  setHidden(obj: {[key: string]: boolean}): void {
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      const configItem = this.formFactory!.getConfigByPath(key);
      configItem.ui.hidden = value
    }
    this.$forceUpdate();
  }

  addControl(path: string, widget: CommonWidget) {
    if (!this.controlMap.get(path)) {
      this.controlMap.set(path, widget);
    }
  }

  getControl(path = ''): CommonWidget | undefined {
    return this.controlMap.get(path);
  }

  getAbstractControl(path: string): AbstractFormControl | null {
    return this.formGroup!.getControl(path);
  }

  private initListener () {
    this.formGroup!.on('valueChange', (value) => {
      this.value = value;
      this.onValueChange(value)
    });
  }
}
</script>

<template src="gl-form.html"></template>
<style src="gl-form.less" lang="less" scoped></style>
