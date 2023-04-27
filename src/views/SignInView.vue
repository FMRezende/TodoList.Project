
<template>
    <div class="signIn">
      <h1 class="title">Sign In</h1>
      <a-input v-model="email" placeholder="Email"></a-input>
      <a-input-password v-model="password" placeholder="Password"></a-input-password>
      <a-button type="primary" @click="signIn">Sign In</a-button>
      <div class="signup-actions">
        <router-link to="/">Sign In</router-link>
      </div>
    </div>
  </template>
  
  <script>
import { mapState, mapActions } from 'pinia';
import userStore from '../stores/user.js';
export default {
    name: 'SignInView',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapState(userStore, ['user']),
    },
    methods: {
        ...mapActions(userStore, ['signIn']),
        async _handleSignIn() {
            try {
                const userData = {
                    email: this.email,
                    password: this.password,
                };
            await this.signIn(userData);
            this.$router.push({ name: 'home' })
            } catch(err) {
                console.error(err)
            }
        },
    }
}
</script>