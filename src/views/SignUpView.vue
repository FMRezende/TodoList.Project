<template>
  <div class="signup">
    <h1 class="title">Sign Up</h1>
    <a-input v-model="email" placeholder="Email"></a-input>
    <a-input-password v-model="password" placeholder="Password"></a-input-password>   
    <a-input-password v-model="repassword"></a-input-password>               
    <a-button type="primary" @click="handleSignUp">Sign Up</a-button>
    <div class="signup-actions">
      <router-link to="/auth/sign-in"></router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '../stores/user.js';
import { Input, Button } from 'ant-design-vue';

export default {

  name: 'SignUpView',
  components:{
  AInput: Input, 
  AInputPassword: Input.Password,
  AButton: Button,
  },

  data() {
    return {
      email: '',
      password: '',
      repassword: '',
    }
  },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['registerUser']),
    async handleSignUp() {
      try {
        if (this.password !== this.repassword) {
          throw new Error('Las contraseñas no coinciden');
        }
        const userData = {
          email: this.email,
          password: this.password,
        };
        console.log(userData)
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