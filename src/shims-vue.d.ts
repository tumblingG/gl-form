declare module '*.vue' {
  import Vue from 'vue';
  export default class ElementClass extends Vue {
      [key: string]: any;
  }
}
