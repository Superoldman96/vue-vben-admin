<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';

import { ColPage, useVbenModal } from '@vben/common-ui';

import { Button, Card } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

import Tree from '../component/Tree.vue';
import modal from './modal.vue';
import { schema } from './schema';

const searchInput = ref('');
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
interface TreeNode {
  title: string;
  id: number;
  children?: TreeNode[];
}

const treeData = computed(() => {
  if (!searchInput.value) return data.value;

  return data.value.filter((item) => filterData(item));
});

function filterData(node: TreeNode): boolean {
  const { title, id, children } = node;

  // 当前节点匹配
  if (
    title.includes(searchInput.value) ||
    id.toString().includes(searchInput.value)
  ) {
    return true;
  }

  // 子节点匹配
  return !!children?.some((child) => filterData(child));
}

const [Modal, modalApi] = useVbenModal({
  connectedComponent: modal,
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
  formApi.setValues({ ...node.data });
};
const handleSubmit = async () => {
  const result = await formApi.validateAndSubmitForm();
  console.log('submit', result);
};
</script>

<template>
  <ColPage auto-content-height v-bind="props">
    <template #left>
      <Tree
        :data="treeData"
        @select="handleSelect"
        @create="modalApi.open()"
        title="菜单"
      />
    </template>

    <Card class="ml-2 h-full" title="基本使用">
      <template #extra>
        <Button type="primary" @click="handleSubmit">提交</Button>
      </template>
      <Form />
    </Card>
    <Modal />
  </ColPage>
</template>
<style scoped></style>
