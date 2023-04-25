import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import SignInView from '../views/SignInView.vue'
import signUpView from '../views/SignUpView.vue'
import UserStore from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children: [
      {
        path: 'sign-in',
        name: 'signIn',
        component: SignInView
      },
      {
        path: 'sign-up',
        name: 'signUp',
        component: signUpView
      },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const useUserStore = UserStore()
  const isLoginIn = useUserStore.user !== null;

  if (!isLoginIn && to.name !== 'signIn' && to.name !== 'signUp') {
    return { name: 'signIn'}
  }
})
export default router


/*import { createRouter, createWebHistory } from "vue-router";


import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";


const routes = [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },

];


const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;*/