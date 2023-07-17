export default [
  {
    path: '/',
    component: () => import('../components/layout.vue'),
    redirect: '/read',
    children: [
      {
        path: '/read',
        name: 'READ',
        component: () => import('@/view/read'),
        meta: {
          title: '自动朗读',
          key: 'read'
        }
      }
    ]
  },

]
