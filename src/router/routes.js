const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/MainPage.vue') },
      {
        path: 'cafedetail',
        component: () => import('src/pages/CafeDetailPage.vue')
      },
      {
        path: 'sns',
        component: () => import('src/pages/CoffeeSNSPage.vue')
      },
      {
        path: 'profile',
        component: () => import('src/pages/UserProfilePage.vue')
      },
      {
        path: 'reqnewcafe',
        component: () => import('src/pages/ReqNewCafePage.vue')
      }
    ]
  },
  {
    path: '/map',
    component: () => import('layouts/MapLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/test/KakaoMapTest.vue')
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
        path: 'card',
        component: () => import('pages/test/CardTest.vue')
      },
      {
        path: 'kakaomap',
        component: () => import('pages/test/KakaoMapTest.vue')
      },
      {
        path: 'modal',
        component: () => import('pages/test/ModalTest.vue')
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
