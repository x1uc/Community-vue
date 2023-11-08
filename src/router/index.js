import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/UserView.vue'
import UserPost from '../views/UserPost.vue';
import MainPost from '../views/MainPost.vue';
import PostContent from '../views/PostContent.vue';
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
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
