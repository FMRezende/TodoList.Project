import { defineStore } from 'pinia';
import supabase from '../supabase/index.js';
import router from "../router";

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

/*import { defineStore } from "pinia";
import { supabase } from "../supabase";
import router from "../router";
//import { useDatabaseStore } from "./listStore";*/

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null,
    loadingUser: false,
    loadingSession: false,
  }),
  
  actions: {
    async fetchUser() {
      const user = await supabase.auth.getSession();
      this.user = user;
    },

    async signIn(email, password) {
      this.loadingUser = true;
      try{
      const { user } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      this.userData = { email: user.email, uid: user.uid };
      router.push("/");
    } catch (error) {
        console.log(error.code);
        return error.code;
    } finally {
        this.loadingUser = false;
    }
      
    },


    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) throw error;
      if (user) {
        this.user = user;
      }
      

    /*async signOut() {
      try {
        const { error } = await supabase.auth.signOut();
        console.log(`Supabase signOut error is ${error}`);
        this.user = null;
        this.loadingSession = null;
        console.log(`Pinia user after signOut is ${JSON.stringify(this.user)}`);
    
        return error;
      } catch (e) {
        console.log(`Error from userStore signOut() is ${e}`);
      }
      router.push("/login");
    },

    
  },
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },*/
  },
)

/*import { defineStore } from 'pinia';
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
})*/


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

