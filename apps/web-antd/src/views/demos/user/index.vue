<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { reactive, ref } from 'vue';

import { ColPage, Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';

import { Button, Card } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';

import Tree from '../component/Tree.vue';
import drawer from './drawer.vue';
import modal from './modal.vue';
import { schema } from './schema';

const data = ref([
  {
    id: 1,
    title: '目录1',
    data: {
      type: 'root',
      name: '目录1',
      parent: 0,
      order: 0,
      icon: '',
      path: '',
      component: '',
      link: 1,
    },
    children: [
      {
        id: 2,
        title: '节点2',
        children: [{ id: 3, title: '节点3', children: [] }],
      },
      { id: 4, title: '节点4', children: [] },
    ],
  },
  {
    id: 66,
    title: '目录6',
    data: {
      type: 'root',
      name: '目录6',
      parent: 0,
      order: 0,
      icon: '',
      path: '',
      component: '',
      link: 0,
    },
    children: [
      {
        id: 62,
        title: '节点62',
        children: [{ id: 63, title: '节点63', children: [] }],
      },
      { id: 64, title: '节点64', children: [] },
    ],
  },
]);

const formOptions: VbenFormProps = {
  // 默认展开
  wrapperClass: 'grid-cols-5',
  collapsed: false,
  fieldMappingTime: [['date', ['start', 'end']]],
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '姓名/工号',
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: '手机号',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: 'Color1',
            value: '1',
          },
          {
            label: 'Color2',
            value: '2',
          },
        ],
        placeholder: '请选择',
      },
      fieldName: 'status',
      label: '状态',
    },
    {
      component: 'RangePicker',
      defaultValue: [dayjs().subtract(7, 'days'), dayjs()],
      fieldName: 'date',
      label: '更新时间',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: false,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const [Modal, modalApi] = useVbenModal({
  connectedComponent: modal,
});
const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: drawer,
});
const [Form, formApi] = useVbenForm({
  schema,
  commonConfig: {
    // 在label后显示一个冒号
    colon: true,
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  showDefaultActions: false,
});

const props = reactive({
  leftCollapsedWidth: 5,
  leftCollapsible: false,
  leftMaxWidth: 50,
  leftMinWidth: 20,
  leftWidth: 30,
  resizable: true,
  rightWidth: 70,
  splitHandle: false,
  splitLine: false,
});
const handleSelect = (node: any) => {
  console.log('selected', node);
  manager.value = node.id;
  gridApi.reload();
};
const handleSubmit = async () => {
  const result = await formApi.validateAndSubmitForm();
  console.log('submit', result);
};
const manager = ref('');
const gridOptions: VxeTableGridOptions<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', title: 'Name', type: 'checkbox', width: 100 },
    { field: 'category', title: 'Category' },
    { field: 'color', title: 'Color' },
    { field: 'productName', title: 'Product Name' },
    { field: 'price', title: 'Price' },
    { field: 'releaseDate', formatter: 'formatDateTime', title: 'Date' },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        message.success(`Query params: ${JSON.stringify(formValues)}`);
        return await getExampleTableApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    search: true,
    zoom: true,
  },
};
const [Grid, gridApi] = useVbenVxeGrid({ gridOptions, formOptions });
</script>

<template>
  <ColPage auto-content-height v-bind="props">
    <template #left>
      <Tree
        :data="data"
        @select="handleSelect"
        @create="modalApi.open()"
        title="用户"
      />
    </template>

    <Card class="ml-2 h-full" :body-style="{ padding: '0' }">
      <Page auto-content-height :height="50">
        <Grid>
          <template #toolbar-tools>
            <Button class="mr-2" type="primary"> 同步 </Button>
            <Button class="mr-2" type="primary" @click="drawerApi.open()">
              新增
            </Button>
          </template>
        </Grid>
      </Page>
    </Card>
    <Modal />
    <Drawer />
  </ColPage>
</template>
<style scoped></style>
