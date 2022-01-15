<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue, Ref } from 'vue-property-decorator';
import GlForm from '../../packages/web/gl-form.vue';
import {formConfig} from './config';


@Component({
  name: 'Test',
  components: {
    GlForm
  }
})
export default class Test extends Vue {
  @Ref() form!: GlForm;

  value: string | null = null;
  formConfig = formConfig;

  onValueChange(value: any) {
    this.value = Object.assign({}, value);
  }
}
</script>

<template src="./test.html"></template>
<style src="./test.less" lang="less" scoped></style>
