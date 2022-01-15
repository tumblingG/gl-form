<script lang="ts">
import 'reflect-metadata';
import { Component } from 'vue-property-decorator';
import CommonWidget from '../../../common/common-widget';

@Component({
    name: 'RadioWidget'
})
export default class RadioWidget extends CommonWidget {

}
</script>

<template src="./radio-widget.html"></template>
<style src="./radio-widget.less" lang="less" scoped></style>
