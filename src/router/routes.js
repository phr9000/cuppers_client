const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MainView.vue') },
      { path: 'test', component: () => import('pages/TestView.vue') },
      {
        path: 'detailcafe',
        component: () => import('pages/DetailCafeView.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
