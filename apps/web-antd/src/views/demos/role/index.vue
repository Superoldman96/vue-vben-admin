<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { reactive, ref } from 'vue';

import { ColPage, Page, useVbenModal } from '@vben/common-ui';
import { createIconifyIcon } from '@vben/icons';

import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Input,
  List,
  ListItem,
  Menu,
  MenuItem,
} from 'ant-design-vue';
import dayjs from 'dayjs';
import XEUtils from 'xe-utils';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import modal from './modal.vue';

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
const dashIcon = createIconifyIcon('ant-design:dash-outlined');
const name = ref('');
const data = ref([
  {
    id: 1,
    title: '目录1',
  },
  {
    id: 66,
    title: '目录6',
  },
]);
const tabs = [
  { key: 'table', tab: '角色成员' },
  { key: 'permissions', tab: '角色权限' },
];
const currentTab = ref('permissions');
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

const selectRole = ref(data.value[0]?.id);
const handleSelect = (role: any) => {
  console.log('selected', role);
  selectRole.value = role.id;

  gridApi.reload();
};
const handleSubmit = async () => {
  const result = await formApi.validateAndSubmitForm();
  console.log('submit', result);
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

  exportConfig: {},
  height: 'auto',
  keepSource: true,
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
    export: true,
    refresh: true,
    resizable: true,
    search: true,
    zoom: true,
  },
};

// 权限选择器选项
const list = [
  { id: '10000', parentId: null, name: '账号管理' },
  { id: '11000', parentId: '10000', name: '用户管理' },
  { id: '11100', parentId: '11000', name: '查看' },
  { id: '11110', parentId: '11100', name: '用户列表' },
  { id: '11200', parentId: '11000', name: '编辑' },
  { id: '11210', parentId: '11200', name: '用户列表' },
  { id: '11220', parentId: '11200', name: '新增用户' },
  { id: '11300', parentId: '11000', name: '操作' },
  { id: '11310', parentId: '11300', name: '新增' },
  { id: '11320', parentId: '11300', name: '删除' },
  { id: '11330', parentId: '11300', name: '修改' },
  { id: '12000', parentId: '10000', name: '角色管理' },
  { id: '12100', parentId: '12000', name: '查看' },
  { id: '12110', parentId: '12100', name: '角色列表' },
  { id: '12200', parentId: '12000', name: '编辑' },
  { id: '122100', parentId: '12200', name: '角色列表' },
  { id: '12220', parentId: '12200', name: '新增角色' },
  { id: '12300', parentId: '12000', name: '操作' },
  { id: '12310', parentId: '12300', name: '新增' },
  { id: '12320', parentId: '12300', name: '删除' },
  { id: '12330', parentId: '12300', name: '修改' },
  { id: '20000', parentId: null, name: '个人中心' },
  { id: '21000', parentId: '20000', name: '个性化设置' },
  { id: '21100', parentId: '21000', name: '查看' },
  { id: '21110', parentId: '21100', name: '信息列表' },
  { id: '21200', parentId: '21000', name: '操作' },
  { id: '21210', parentId: '21200', name: '重置信息' },
  { id: '22000', parentId: '20000', name: '账户管理' },
  { id: '22100', parentId: '22000', name: '查看' },
  { id: '22110', parentId: '22100', name: '账户余额' },
  { id: '22120', parentId: '22100', name: '帐变记录' },
];

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions, formOptions });
const [PermissionsGrid, permissionsGridApi] = useVbenVxeGrid({
  gridOptions: {
    virtualXConfig: {
      enabled: false,
    },
    virtualYConfig: {
      enabled: false,
    },
    pagerConfig: {
      enabled: false,
    },
    columns: [
      {
        title: '一级分类',
        field: 'category1',
        slots: { default: 'category1_default' },
      },
      {
        title: '二级分类',
        field: 'category2',
        slots: { default: 'category2_default' },
      },
      {
        title: '三级分类',
        field: 'category3',
        slots: { default: 'category3_default' },
      },
    ],
    data: [],
    spanMethod({ row, _rowIndex, column, visibleData }) {
      const fields = ['category1', 'category2', 'category3'];
      const cellValue = row[column.field];

      if (cellValue && fields.includes(column.field)) {
        const prevRow = visibleData[_rowIndex - 1];
        let nextRow = visibleData[_rowIndex + 1];
        if (prevRow && prevRow[column.field] === cellValue) {
          return { rowspan: 0, colspan: 0 };
        } else {
          let countRowspan = 1;
          while (nextRow && nextRow[column.field] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex];
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 };
          }
        }
      }
    },
  },
});
const treeData = XEUtils.toArrayTree(list);
console.log(treeData);
toColTreeData(treeData);
// 将普通树结构转换为横向树列表
function toColTreeData(treeData: any[]) {
  const options = { children: 'children' };
  const list: any[] = [];
  const keyMap: any = {};
  XEUtils.eachTree(
    treeData,
    (item, index, result, paths, parent) => {
      keyMap[item.id] = item;
      item.keys = parent ? [...parent.keys, item.id] : [item.id];

      if (!item.children || item.children.length === 0) {
        const row: any = {};
        item.keys.forEach((key: any, index: number) => {
          const level = index + 1;
          const obj = keyMap[key];
          row[`check${level}`] = false;
          row[`id${level}`] = obj.id;
          row[`category${level}`] = obj.name;
        });
        list.push(row);
      }
    },
    options,
  );
  console.log(list);
  permissionsGridApi.setGridOptions({ data: list });
}
const [Modal, modalApi] = useVbenModal({
  connectedComponent: modal,
});

const permissions = ref(['aaa']);
</script>

<template>
  <ColPage auto-content-height v-bind="props">
    <template #left>
      <Card class="h-full" title="角色">
        <template #extra> <Button type="primary"> 新增 </Button> </template>
        <Input v-model:value="name" placeholder="请输入角色名称" />
        <List :data-source="data" :split="false" item-layout="vertical">
          <template #renderItem="{ item }">
            <ListItem
              :key="item.id"
              @click="handleSelect(item)"
              :class="{ 'bg-gray-800': item.id === selectRole }"
            >
              <template #extra>
                <div class="flex items-center" v-if="item.id === selectRole">
                  <Dropdown>
                    <a @click.prevent>
                      <dashIcon />
                    </a>
                    <template #overlay>
                      <Menu>
                        <MenuItem>
                          <a href="javascript:;">1st menu item</a>
                        </MenuItem>
                        <MenuItem>
                          <a href="javascript:;">1st menu item</a> </MenuItem
                        ><MenuItem>
                          <a href="javascript:;">1st menu item</a>
                        </MenuItem>
                      </Menu>
                    </template>
                  </Dropdown>
                </div> </template
              >{{ item.title }}
            </ListItem>
          </template>
        </List>
      </Card>
    </template>
    <Card
      class="ml-2 h-full"
      :body-style="{ padding: '0' }"
      :tab-list="tabs"
      :active-tab-key="currentTab"
      @tab-change="(key) => (currentTab = key)"
    >
      <Page auto-content-height :height="80">
        <Grid v-if="currentTab === 'table'">
          <template #toolbar-tools>
            <Button class="mr-2" type="primary" @click="modalApi.open()">
              新增
            </Button>
          </template>
        </Grid>

        <PermissionsGrid v-if="currentTab === 'permissions'">
          <template #category1_default="{ row }">
            <Checkbox>{{ row.category1 }}</Checkbox>
          </template>
          <template #category2_default="{ row }">
            <Checkbox>{{ row.category2 }}</Checkbox>
          </template>
          <template #category3_default="{ row }">
            <Checkbox>{{ row.category3 }}</Checkbox>
          </template>
        </PermissionsGrid>
      </Page>
    </Card>
    <Modal />
  </ColPage>
</template>
<style scoped></style>
