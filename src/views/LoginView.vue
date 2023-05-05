<template>
    <h1 class="text-center">Login</h1>
    <div class="row justify-content-center">
      <div class="col-sm-12 col-md-6">
        <form @submit.prevent="onFinish" @invalid="onFinishFailed">
          <div class="mb-3">
            <label for="email" class="form-label">Ingrese tu correo</label>
            <input type="email" class="form-control" id="email" required v-model="formState.email">
            <div class="invalid-feedback">
              Ingresa un email válido.
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Ingrese contraseña</label>
            <input type="password" class="form-control" id="password" minlength="6" required v-model="formState.password">
            <div class="invalid-feedback">
              Ingresa una contraseña con mínimo 6 carácteres.
            </div>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="userStore.loadingUser">
            <template v-if="userStore.loadingUser">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span class="visually-hidden">Cargando...</span>
            </template>
            <template v-else>
              Ingresar
            </template>
          </button>
        </form>
      </div>
    </div>
  </template>

<script setup>


import { reactive } from "vue";
import { useUserStore } from "../stores/user";


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