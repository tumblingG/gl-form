import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import {FormControl} from '../abstract-form';
import {FormConfigItemInterface} from '../config';
import GlForm from '../web/gl-form.vue';


@Component
export default class CommonWidget extends Vue {
  @Prop() path!: string;
  @Prop() control!: FormControl;
  @Prop() config!: FormConfigItemInterface;

  value: any = null;
  dirty = false;
  touched = false;
  form: GlForm | null = null;

  created(): void {
    this.updateView(this.control.value);
    this.initListener();
  }

  mounted(): void {
    this.form = this.getForm();
    (this.form as any).addControl(this.path, this);
  }

  getForm(): GlForm {
    let parent = this.$parent as any;
    while (parent && parent.$options.name !== 'GlForm') {
      parent = parent.$parent;
    }
    return parent || null
  }

  protected initListener() {
    const {onChange} = this.config.ui;
    const control = this.control;
    control.on('valueChange', (value, control) => {
      this.updateView(value);
      if (typeof onChange === 'function') {
        onChange(value, this.form, this);
      }
    });

    control.on('dirty', (value) => {
      this.dirty = value;
    });

    control.on('touched', (value) => {
      this.touched = value;
    });
  }

  viewToModel(value: any) {
    this.control.setValue(value);
    this.setDirty();
    this.setTouched();
  }

  updateView(value: any) {
    this.value = value;
  }

  setDirty() {
    if (!this.dirty) {
      this.control.setDirty(true);
    }
  }

  setTouched() {
    if (!this.touched) {
      this.control.setTouched(true);
    }
  }

  showRequiredStar(bool: boolean) {
    this.$emit('showRequiredStar', bool)
  }
}
