import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/UserView.vue'
import UserPost from '../views/UserPost.vue';
import MainPost from '../views/MainPost.vue';
import PostContent from '../views/PostContent.vue';
import Notice from '../views/Notice.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/userPost',
        name: "userPost",
        component: UserPost
      },
      {
        path: '/mainPost',
        name: "主页",
        component: MainPost
      }, {
        path: '/postContent:id',
        name: "postContent",
        component: PostContent,
        props: true
      },
      {
        path: '/Notice',
        name: "Notice",
        component: Notice,
        props: true
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
