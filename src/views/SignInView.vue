
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
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import supabase from '../supabase/index'

  
  export default defineComponent({
    name:'SignInView',

    setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const router = useRouter();

    const signIn = async () => {
      try {
       await supabase.auth.signInWithPassword(email.value, password.value);
        // Redirect to home page after successful sign in
        router.push('/');
      } catch (error) {
        // Display error message on sign in failure
        errorMessage.value = error.message;
      }
    };

    return {
      email,
      password,
      errorMessage,
      signIn,
    };
    },
  });
  </script>
  
  <!--<style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  form {
    display: grid;
    gap: 10px;
  }
  
  button {
    margin-top: 10px;
  }
  </style>-->

 

<!--<template>
  <div>
    <h1>Sign In</h1>
    
    <div class="form">
         
        <input v-model="email" placeholder="Email" />
        <input v-model="password" placeholder="Password" type="password" />
       
        <button @click="signIn">Sign In</button>
      
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </div>
       
      <div class="link">
        Don't have an account? <router-link to="/sign-up">Sign Up</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { router } from '@/router';
  import supabase from '../supabase/index'

  
  export default defineComponent({
    name: 'SignIn',
    setup() {
      const formState = reactive({
      email = '',
      password = '',
      errorMessage = '',
  
      const  = async () => {
        try {
            const { error } = await supabase.auth.signInWithPassword(formState.email, formState.password);
          // Redirect to home page after successful sign in
          router.push('/auth');
          if (!error) {
        return message.success("Bienvenidos a la super apps ");
    }
    switch (error) {
        case "auth/user-not-found":
            message.error("No existe el correo registrado ");
            break;
        case "auth/wrong-password":
            message.error("Error de contraseña ");
            break;
        default:
            message.error(
                "Ocurrió un error en el servidor intentelo más tarde..."
            );
            break;
    }

      return {
        email,
        password,
        errorMessage,
        signIn,
      };
    }
      }

  });
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};
  </script>
  
  <style scoped>
  .form {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
  }
  
  .error {
    color: red;
    margin-top: 8px;
  }
  
  .link {
    margin-top: 16px;
  }
  </style> -->