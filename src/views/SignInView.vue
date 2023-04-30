<template>
    <div>
    <h1>SIGN IN</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email">
      
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password">
      
      <button type="button" @click.prevent="_handleSignIn">Sign In</button>
    </form>
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

<style>
</style>