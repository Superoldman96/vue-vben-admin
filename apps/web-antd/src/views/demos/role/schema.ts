import type { VbenFormSchema } from '#/adapter/form';

export const schema: VbenFormSchema[] = [
  {
    component: 'RadioGroup',
    componentProps: {
      optionType: 'button',
      options: [
        { label: '目录', value: 'root' },
        { label: '菜单', value: 'menu' },
      ],
    },
    defaultValue: 'root',
    fieldName: 'type',
    label: '菜单类型',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '',
    },
    fieldName: 'name',
    label: '菜单名称',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      placeholder: '请选择父级菜单',
      options: [
        { label: '顶级菜单', value: '0' },
        { label: '菜单1', value: '1' },
        { label: '菜单2', value: '2' },
        { label: '菜单3', value: '3' },
      ],
    },
    dependencies: {
      show: (values) => values.type === 'menu',
      triggerFields: ['type'],
    },
    fieldName: 'parent',
    label: '父级菜单',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入排序',
    },
    fieldName: 'order',
    label: '排序',
  },
  {
    component: 'IconPicker',
    fieldName: 'icon',
    label: '图标',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入路由地址',
    },
    fieldName: 'path',
    label: '路由地址',
    dependencies: {
      show: (values) => values.type !== 'root',
      triggerFields: ['type'],
    },
  },
  {
    component: 'RadioGroup',
    componentProps: {
      optionType: 'button',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    defaultValue: 0,
    fieldName: 'disabled',
    label: '是否禁用',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      optionType: 'button',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    defaultValue: 0,
    fieldName: 'link',
    label: '是否外链',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      optionType: 'button',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    defaultValue: 0,
    fieldName: 'show',
    label: '是否显示',
  },
];
