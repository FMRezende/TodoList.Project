<template>
  <div>
    <h2>SIGN UP</h2>
    <form>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" required>
      </div>
      <button @click="handleSignUp" type="button">Register</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '../stores/user.js';
export default {
  name: 'SignUpView',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['registerUser']),
    async handleSignUp() {
      try {
        if (this.password !== this.confirmPassword) {
          throw new Error('Las contraseñas no coinciden');
        }
        const userData = {
          email: this.email,
          password: this.password,
        };
        await this.registerUser(userData.email, userData.password);
        console.log(this.user)
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.error(err)
      }
    }
  }
};
</script>

<style></style>