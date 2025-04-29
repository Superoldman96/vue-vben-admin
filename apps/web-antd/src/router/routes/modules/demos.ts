import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('demos.title'),
    },
    name: 'Demos',
    path: '/demos',
    children: [
      {
        meta: {
          title: $t('demos.antd'),
        },
        name: 'AntDesignDemos',
        path: '/demos/ant-design',
        component: () => import('#/views/demos/antd/index.vue'),
      },
      {
        meta: {
          title: '菜单',
        },
        name: 'Menu',
        path: '/demos/menu',
        component: () => import('#/views/demos/menu/index.vue'),
      },
      {
        meta: {
          title: '用户',
        },
        name: 'User',
        path: '/demos/user',
        component: () => import('#/views/demos/user/index.vue'),
      },
      {
        meta: {
          title: '角色',
        },
        name: 'Role',
        path: '/demos/role',
        component: () => import('#/views/demos/role/index.vue'),
      },
    ],
  },
];

export default routes;
