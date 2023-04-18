import { defineStore } from 'pinia'

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
});
