<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { schema } from './schema';

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
const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    try {
      const result = await formApi.validateAndSubmitForm();
      if (!result) return;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      formApi.resetForm();
    }
  },
});
</script>

<template>
  <Modal title="新增">
    <Form />
  </Modal>
</template>
