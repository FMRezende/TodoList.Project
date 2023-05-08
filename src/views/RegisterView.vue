<template>
  <div class="container">
    <h1 class="text-center mt-5 mb-4">Register</h1>
    <div class="row justify-content-center">
      <div class="col-sm-12 col-md-8 col-lg-6">
        <form @submit.prevent="onFinish" autocomplete="off">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="formState.email" required>
            <div class="invalid-feedback">
              Please enter a valid email.
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="formState.password" minlength="6" required>
            <div class="invalid-feedback">
              Please enter a password with at least 6 characters.
            </div>
          </div>
          <div class="form-group">
            <label for="repassword">Confirm Password</label>
            <input type="password" class="form-control" id="repassword" v-model="formState.repassword"
              :disabled="formState.password === ''" :pattern="`^${formState.password}$`" required>
            <div class="invalid-feedback">
              Passwords do not match.
            </div>
          </div>
          <div class="form-group text-center">
            <button type="submit" class="btn btn-primary" :disabled="userStore.loadingUser">
              {{ userStore.loadingUser ? 'Signing up...' : 'Sign up' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore();
const formState = reactive({
  email: "",
  password: "",
  repassword: "",
});
const onFinish = async () => {
  const error = await userStore.signUp(formState.email, formState.password);
  router.push({ path: "/" });
  if (!error) {
    alert("Revisa tu correo electrónico y verifícalo");
  }
  switch (error) {
    case "auth/email-already-in-use":
      alert("Email ya registrado");
      break;
    default:
      alert("Ocurrió un error en el servidor intentelo más tarde...");
      break;
  }
};
</script>