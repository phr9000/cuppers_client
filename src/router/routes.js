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
        path: 'my',
        component: () => import('src/pages/MyPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        component: () => import('src/pages/UserProfilePage.vue')
      },
      {
        path: 'review/write/:id',
        component: () => import('src/pages/WriteReviewPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'reqnewcafe',
        component: () => import('src/pages/ReqNewCafePage.vue')
      },
      {
        path: 'newcafe',
        component: () => import('src/pages/ReqNewCafePage.vue')
      },
      {
        path: 'addnewcafe',
        component: () => import('src/pages/AddNewCafePage.vue')
      },
      {
        path: 'login',
        component: () => import('src/pages/LoginPage.vue')
      },
      {
        path: 'signup',
        component: () => import('src/pages/SurveyPage.vue')
      },
      {
        path: 'cnote/:id',
        component: () => import('src/pages/CnoteDetailPage.vue')
      },
      {
        path: 'cnote/write',
        component: () => import('src/pages/WriteCnotePage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/map',
    component: () => import('layouts/MapLayout.vue')
  },
  {
    path: '/sns',
    component: () => import('layouts/SNSLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CnoteMainPage.vue') },
      {
        path: 'cnote',
        component: () => import('pages/CnoteMainPage.vue')
      },
      {
        path: 'review',
        component: () => import('pages/ReviewMainPage.vue')
      }
    ]
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
        component: () => import('pages/test/parent/IconTest.vue')
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
        path: 'card3',
        component: () => import('pages/test/CardTest3.vue')
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
        path: 'carduserinfo',
        component: () => import('pages/test/CardUserInfo.vue')
      },
      {
        path: 'imageupload',
        component: () => import('pages/test/ImageUploadTest.vue')
      },
      {
        path: 'cardmenutest',
        component: () => import('pages/test/CardMenuTest.vue')
      },
      {
        path: 'review',
        component: () => import('pages/test/reviewPage.vue')
      },
      {
        path: 'welcomeuser',
        component: () => import('pages/test/WelcomeUser.vue')
      }
    ]
  },
  // {
  //   path: '/login',
  //   component: () => import('layouts/LoginLayout.vue'),
  //   children: [{ path: '', component: () => import('src/pages/LoginPage.vue') }]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/general/ErrorNotFound.vue')
  }
]

export default routes
