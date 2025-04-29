<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';

import dayjs from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

const [Modal, modalApi] = useVbenModal({
  class: 'w-[70%]',
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    try {
      console.log(11);
    } catch (error) {
      console.log(error);
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {}
  },
});
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
const gridOptions: VxeTableGridOptions<RowType> = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', title: 'Name', type: 'checkbox', width: 100 },
    { field: 'category', title: 'Category' },
    { field: 'color', title: 'Color' },
    { field: 'productName', title: 'Product Name' },
    { field: 'price', title: 'Price' },
    { field: 'releaseDate', formatter: 'formatDateTime', title: 'Date' },
  ],
  height: 'auto',
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        console.log(selectRole.value);
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
    refresh: true,
    resizable: true,
    search: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions, formOptions });
</script>

<template>
  <Modal title="新增">
    <Page auto-content-height> <Grid /></Page>
  </Modal>
</template>
