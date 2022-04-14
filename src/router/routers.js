export default [{
    path: '/login',
    name: 'login',
    component: () => import('@/page/login/Login.vue')
  },
  {
    path: "/",
    component: () => import('@/page/wechat/Wechat.vue'),
    redirect: '/chat',
    children: [{
        path: '/chat',
        component: () => import('@/page/chat/Chat.vue')
      },
      {
        path: '/friend',
        component: () => import('@/page/friend/Friend.vue')
      },
      {
        path: '/game',
        component: () => import('@/page/game/Game.vue')
      }
    ]
  },
]