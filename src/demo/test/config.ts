import {FormConfig} from '../../packages/config';
import {Validators} from '../../packages/abstract-form';

export const formConfig: FormConfig = [
  {
    name: 'age',
    label: '年龄',
    widget: 'input',
    ui: {
      span: 24
    },
    defaultValue: '123',
    validators: [
      {validator: Validators.required, message: '必填'},
      {validator: Validators.min(10), message: '不能小于10'},
      {validator: Validators.max(100), message: '不能大于100'}
    ]
  },
  {
    name: 'sex',
    label: '性别',
    widget: 'radio',
    options: [
      {label: '男', value: 1},
      {label: '女', value: 2}
    ],
    ui: {
      span: 24
    },
    defaultValue: 2,
    validators: [
      {validator: Validators.pattern('1'), message: '只能选男'}
    ]
  },
  // {
  //   name: 'rank',
  //   label: '级别',
  //   widget: 'checkbox',
  //   options: [
  //     {label: '一级', value: 1},
  //     {label: '二级', value: 2}
  //   ],
  //   ui: {
  //     span: 24
  //   },
  //   defaultValue: [1]
  // },
  {
    name: 'class',
    label: '班级',
    widget: 'select',
    options: [
      {label: '小学', value: 1},
      {label: '中学', value: 2}
    ],
    ui: {
      span: 24
    },
    defaultValue: 2
  }
];
