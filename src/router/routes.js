const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/MainPage.vue') },
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
        path: 'login',
        component: () => import('src/pages/LoginPage.vue')
      }
    ]
  },
  {
    path: '/cafe',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: ':id', component: () => import('pages/CafeDetailPage.vue') },
      {
        path: '/review/write/:id',
        component: () => import('pages/WriteReviewPage.vue'),
        meta: { requiresAuth: true }
      },
      { path: 'req', component: () => import('pages/ReqNewCafePage.vue') },
      { path: 'create', component: () => import('pages/AddNewCafePage.vue') }
    ]
  },
  {
    path: '/welcome',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WelcomeUser.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'survey',
        component: () => import('pages/SurveyPage.vue'),
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
    path: '/cnote',
    component: () => import('layouts/BasicLayout.vue'),
    children: [
      {
        path: ':id',
        component: () => import('pages/CnoteDetailPage.vue')
      },
      {
        path: 'write',
        component: () => import('pages/WriteCnotePage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/test',
    component: () => import('layouts/BasicLayout.vue'),
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
        path: 'childref',
        component: () => import('pages/test/ChildRefTest.vue')
      },
      {
        path: 'inputref',
        component: () => import('pages/test/InputRefTest.vue')
      },
      {
        path: 'swiper',
        component: () => import('pages/test/SwiperTest.vue')
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
