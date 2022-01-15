<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FormConfigItemInterface, FormConfigItemUI } from '../../config';
import {FormControl, FormGroup} from '../../abstract-form';
import {registerService} from '../../services/register-service';

@Component({
    name: 'ControlWrapper'
})
export default class ControlWrapper extends Vue {
    @Prop() config!: FormConfigItemInterface;
    @Prop() path!: string;
    @Prop() rootForm!: FormGroup;
    @Prop() labelWidth!: string;

    ui: FormConfigItemUI | null = null;
    control: FormControl | null = null;

    widget: any = null;
    isRequired: boolean | undefined = false;

    get innerLabelWidth () {
        return this.ui!.labelWidth || this.labelWidth
    }

    created(): void {
        this.ui = this.config.ui;
        this.control = this.rootForm.getControl(this.path) as FormControl;
        this.getWidget().catch(err => console.error(err));
        this.isRequired = this.ui.required;
    }

    async getWidget() {
        const fn = registerService.getWidgetPath(this.config.widget);
        const module: any = await fn();
        this.widget = module.default;
    }

    showRequiredStar(isShow: boolean) {
        this.isRequired = isShow;
    }
}
</script>

<template src="./control-wrapper.html"></template>
<style src="./control-wrapper.less" lang="less"></style>
