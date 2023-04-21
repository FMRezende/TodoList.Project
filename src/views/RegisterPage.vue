<template>
  <div>
      <h1>Register</h1>
      <form @submit.prevent="handleSubmit">
          <input type="email" placeholder="Ingrese email" v-model.trim="email">
          <input type="password" placeholder="Ingrese contraseña" v-model.trim="password">
          <button type="submit" :disabled="userStore.loadingUser">Crear usuario</button>
      </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import {useUserStore} from '../stores/user'
  
  const userStore = useUserStore()

  const email = ref('')
  const password = ref('')

  const handleSubmit = async() => {
      if(!email.value || password.value.length < 6){
          return alert('llena los campos')
      }
  console.log(email.value);
  console.log(password.value);
  console.log('procesando formulario')
      await userStore.registerUser(email.value, password.value)
  
      /*return {
        email,
        password,
        handleSubmit,
      };*/
  }
</script>


<!--import { useUserStore } from '../stores/user';
const userStore = useUserStore()

  /*import { ref } from "vue";
  import { supabase } from "../supabase";
  
  export default {
    setup() {
      const email = ref("");
      const password = ref("");
  
      const handleSignup = async () => {
        try {
          // Use the Supabase provided method to handle the signup
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });
          if (error) throw error;
        } catch (error) {
          alert(error.error_description || error.message);
        }
      };
  
      return {
        email,
        password,
        handleSignup,
      };
    },
  };-->
  
