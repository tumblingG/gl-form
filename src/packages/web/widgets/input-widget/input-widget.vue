<script lang="ts">
import 'reflect-metadata';
import { Component } from 'vue-property-decorator';
import CommonWidget from '../../../common/common-widget';

@Component({
  name: 'InputWidget'
})
export default class InputWidget extends CommonWidget {

}
</script>

<template src="./input-widget.html"></template>
<style src="./input-widget.less" lang="less" scoped></style>
