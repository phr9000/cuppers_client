const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/MainPage.vue') },
      {
        path: 'cafe/:id',
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
      },
      {
        path: 'newcafe',
        component: () => import('src/pages/AddNewCafePage.vue')
      },
      {
        path: 'signup',
        component: () => import('src/pages/SurveyPage.vue')
      },
      {
        path: 'cnotedetail',
        component: () => import('src/pages/CnoteDetailPage.vue')
      }
    ]
  },
  {
    path: '/map',
    component: () => import('layouts/MapLayout.vue')
  },
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/test/ButtonTest.vue') },
      {
        path: 'btn',
        component: () => import('pages/test/ButtonTest.vue')
      },
      {
        path: 'icon',
        component: () => import('pages/test/IconTest.vue')
      },
      {
        path: 'card',
        component: () => import('pages/test/CardTest.vue')
      },
      {
        path: 'card2',
        component: () => import('pages/test/CardTest2.vue')
      },
      {
        path: 'modal',
        component: () => import('pages/test/ModalTest.vue')
      },
      {
        path: 'like',
        component: () => import('pages/test/LikeTest.vue')
      },
      {
        path: 'some',
        component: () => import('pages/test/SomeTest.vue')
      },
      {
        path: 'cnotedetail',
        component: () => import('pages/test/CnoteDetailPage.vue')
      },

      {
        path: 'carduserinfo',
        component: () => import('pages/test/CardUserInfo.vue')
      },
      {
        path: 'imageupload',
        component: () => import('pages/test/ImageUploadTest.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/LoginPage.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/general/ErrorNotFound.vue')
  }
]

export default routes
