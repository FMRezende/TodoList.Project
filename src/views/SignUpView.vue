<template>
  <div class="signup">
    <h1 class="title">Sign Up</h1>
    <a-input v-model="form.email" placeholder="Email"></a-input>
    <a-input-password v-model="form.password" placeholder="Password"></a-input-password>
    <a-form-item
                    name="repassword"
                    label="Repita contraseña"
                    :rules="[
                        {
                            validator: validatePass,
                        },
                    ]"
                >
                    <a-input-password
                        v-model:value="repassword"
                    ></a-input-password>
                </a-form-item>
    <a-button type="primary" @click="signUp">Sign Up</a-button>
    <div class="signup-actions">
      <router-link to="/sign-in">Sign In</router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import supabase from '../supabase/index';
import { message } from "ant-design-vue";
import { useRouter } from 'vue-router';


export default defineComponent({
    name:'SignUpView',

  setup() {
    const form = ref({
      email: '',
      password: '',
      repassword: "",
    });

    const router = useRouter();

    const validatePass = async (_rule, value) => {
    if (value === "") {
        return Promise.reject("Repita contraseña");
    }
    if (value !== form.value.password) {
        return Promise.reject("No coinciden las contraseñas");
    }
    return Promise.resolve();
};
    

    const signUp = async () => {
         const error = await supabase.auth.signUp(form.value.email, form.value.password)
         .then(() => {
          router.push('/sign-in');
        })
        .catch((error) => {
          console.error('Failed to sign up:', error);
          this.$message.error('Failed to sign up. Please try again.');
        });
    
    switch (error) {
        case "auth/email-already-in-use":
            message.error("Email ya registrado");
            break;
        default:
            message.error(
                "Ocurrió un error en el servidor intentelo más tarde..."
            );
            break;
    }
    };

    return {
      form,
      signUp,
      validatePass,
      
    };
  },
});
</script>

<!--<template>
    <div class="container">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <button type="submit">Sign Up</button>
          <router-link to="/signin">Sign In</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  import supabase from '../supabase/index'
  
  export default defineComponent({
    setup() {
      const userStore = useUserStore();
  
      // Form data
      const email = '';
      const password = '';
  
      // Event handler
      const handleSubmit = async () => {
        try {
          await userStore.signUp(email.value, password.value);
        } catch (error) {
          console.error(error);
        }
      };
  
      return {
        email,
        password,
        handleSubmit,
      };
    },
  });
  </script>
  
  <style scoped>
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