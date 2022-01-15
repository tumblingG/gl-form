<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import CommonWidget from '../../../common/common-widget';

@Component({
    name: 'SelectWidget'
})
export default class SelectWidget extends CommonWidget {

}
</script>

<template src="./select-widget.html"></template>
<style src="./select-widget.less" lang="less" scoped></style>
