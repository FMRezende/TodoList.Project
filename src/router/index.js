import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import UserStore from '../stores/user.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children: [
        {
          path: 'sign-in',
          name: 'signIn',
          component: SignInView,
        },
        {
          path: 'sign-up',
          name: 'signUp',
          component: SignUpView,
        },
      ]
    },
  ],
})


router.beforeEach(async (to) => {
  const { name, meta } = to
  const store = UserStore();
  await store.fetchUser();
  const { user } = store
  console.log(user)

  if(meta.requiresAuth && user === null){
    return {name: 'signIn'}
  }
  if ((name === 'signIn' || name === 'signUp') && user !== null) {
    return {name:'home'}
  }
});

export default router