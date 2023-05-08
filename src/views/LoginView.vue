<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Login</h1>
    <div class="row justify-content-center">
      <div class="col-sm-12 col-md-6">
        <form @submit.prevent="onFinish" @invalid="onFinishFailed" class="needs-validation" novalidate>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="email" required v-model="formState.email" placeholder="Ingresa tu correo">
            <label for="email">Ingrese tu correo</label>
            <div class="invalid-feedback">
              Ingresa un email válido.
            </div>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="password" minlength="6" required v-model="formState.password" placeholder="Ingresa tu contraseña">
            <label for="password">Ingrese contraseña</label>
            <div class="invalid-feedback">
              Ingresa una contraseña con mínimo 6 carácteres.
            </div>
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary" :disabled="userStore.loadingUser">
              <template v-if="userStore.loadingUser">
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                <span class="visually-hidden">Cargando...</span>
              </template>
              <template v-else>
                Ingresar
              </template>
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
import {useRouter} from 'vue-router';

const router = useRouter()
const userStore = useUserStore();
const formState = reactive({
  email: "",
  password: "",
});
const onFinish = async (values) => {
  console.log("Success:", values);
  const error = await userStore.signIn(
      formState.email,
      formState.password,
      
  );
  router.push({path: "/"});
  if (!error) {
      alert("Bienvenidos a la super apps ");
  }
  switch (error) {
      case "auth/user-not-found":
          alert("No existe el correo registrado ");
          break;
      case "auth/wrong-password":
          alert("Error de contraseña ");
          break;
      default:
          alert(
              "Ocurrió un error en el servidor intentelo más tarde..."
          );
          break;
  }
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>