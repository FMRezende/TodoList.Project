import { defineStore } from 'pinia';
import supabase from '../supabase';

export default defineStore('userStore', {
    state: () => ({
        user: undefined,
    }),
    actions: {
        async fetchUser() {
            const { data: { user } } = await supabase.auth.getUser()
            this.user = user;
        },
        async registerUser( email, password ) {
            const { data: { user }, error } = await supabase.auth.signUp({
                email: email,
                password: password,
          });
          if (error) throw error;
          if (user) this.user = user;
        },
        async signIn( {email, password}) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
              });
              if (error) throw error;
              if (data) this.user = data;
        },
        async signOut() {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            this.user = null;
        },
    },
})