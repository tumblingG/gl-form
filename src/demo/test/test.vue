<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'Test'
})
export default class Test extends Vue {

}
</script>

<template src="./test.html"></template>
<style src="./test.less" lang="less" scoped></style>
