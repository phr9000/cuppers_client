const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/MainPage.vue') },
      {
        path: 'cafedetail',
        component: () => import('src/pages/CafeDetailPage.vue')
      }
    ]
  },
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/test/SomeTest.vue') },
      {
        path: 'icon',
        component: () => import('pages/test/IconTest.vue')
      },
      {
        path: 'kakaomap',
        component: () => import('pages/test/KakaoMapTest.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/general/ErrorNotFound.vue')
  }
]

export default routes
