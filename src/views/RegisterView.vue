<template>
  <h1 class="text-center text-primary mt-5 mb-4">To-do app</h1>
  <img class="img-fluid mx-auto d-block" src="../images/box.1.jpg" alt="Vue logo" style="max-width: 20%">
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
/////////////////////
const router = useRouter()
const userStore = useUserStore();
const formState = reactive({
  email: "",
  password: "",
  repassword: "",
});


const onFinish = async () => {
  if (!validateEmail(formState.email)) {
    alert("Please enter a valid email.");
    return;
  }
  if (formState.password.length < 6) {
    alert("Please enter a password with at least 6 characters.");
    return;
  }
  if (formState.password !== formState.repassword) {
    alert("Passwords do not match.");
    return;
  }

  const error = await userStore.signUp(formState.email, formState.password);
  router.push({ path: "/" });
  if (!error) {
    alert("Please check your email and verify your account.");
  }
  switch (error) {
    case "auth/email-already-in-use":
      alert("This email is already registered.");
      break;
    default:
     
  }
};

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
</script>