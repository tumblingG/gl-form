<script lang="ts">
import 'reflect-metadata';
import { Component } from 'vue-property-decorator';
import CommonWidget from '../../../common/common-widget';

@Component({
    name: 'CheckboxWidget'
})
export default class CheckboxWidget extends CommonWidget {

}
</script>

<template src="./checkbox-widget.html"></template>
<style src="./checkbox-widget.less" lang="less" scoped></style>
