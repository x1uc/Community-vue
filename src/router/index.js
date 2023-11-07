import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/UserView.vue'
import UserPost from '../views/UserPost.vue';
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
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
