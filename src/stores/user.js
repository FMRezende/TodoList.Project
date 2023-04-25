import { defineStore } from 'pinia';
import supabase from '../supabase/index.js';

export default defineStore ('user', {
  state: () => {
    return {
      user: null,
    }
  },
  actions: {
    async fetchUser() {
      const { data: { user} } = await supabase.auth.getUser()
      this.user = user
    }
  }
})


/*import { defineStore } from 'pinia'

export const useUserStore = defineStore("userStore",{
  state: () => ({
    userData: null,
  }),
  actions: {
    async registerUser(email,password){
      try {
        const { user } = (
          email,
          password
        );
        this.userData = {email: user.email, uid:user.uid}
      } catch ( error ) {
        console.log(error);
      }
    },
  },
});*/

