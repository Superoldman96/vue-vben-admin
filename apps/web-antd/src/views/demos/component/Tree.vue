<script lang="ts" setup>
import { computed, ref } from 'vue';

import { createIconifyIcon } from '@vben/icons';

import {
  Button,
  Card,
  Dropdown,
  Input,
  Menu,
  MenuItem,
  Tree,
} from 'ant-design-vue';

interface TreeNode {
  title: string;
  id: number;
  children?: TreeNode[];
}
interface Props {
  data: TreeNode[];
  title;
}

const { data } = defineProps<Props>();
const emits = defineEmits(['select', 'create']);
const searchInput = ref('');
const treeData = computed(() => {
  if (!searchInput.value) return data;

  return data.filter((item) => filterData(item));
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

const handleSelect = (selectedKeys: any, { node }: any) => {
  console.log('selected', selectedKeys, node);
  emits('select', node);
};

const dashIcon = createIconifyIcon('ant-design:dash-outlined');
</script>

<template>
  <Card class="h-full" :title="title">
    <Input
      v-model:value="searchInput"
      allow-clear
      placeholder="输入编码或名称搜索"
    />
    <Tree
      :tree-data="treeData"
      auto-expand-parent
      default-expand-all
      @select="handleSelect"
    >
      <template #title="{ title, selected }">
        <div class="flex w-full justify-between">
          <div>{{ title }}</div>
          <div class="flex items-center" v-if="selected">
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
          </div>
        </div>
      </template>
    </Tree>
    <template #extra>
      <Button type="primary" @click="emits('create')">新增</Button>
    </template>
  </Card>
</template>
<style scoped>
:deep(.ant-tree-treenode) {
  width: 100%;
}
:deep(.ant-tree-node-content-wrapper) {
  width: 100%;
}
</style>
