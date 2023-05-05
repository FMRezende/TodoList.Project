<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">Home</router-link>
      <ul class="navbar-nav">
        <li class="nav-item" v-if="!userStore.user">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item" v-if="!userStore.user">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li class="nav-item" v-if="userStore.user">
          <a class="nav-link" href="#" @click="userStore.signOut">Logout</a>
        </li>
      </ul>
    </nav>
    <div class="container-fluid mt-3">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div v-if="userStore.loadingSession">loading user...</div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "./stores/user";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const selectedKeys = ref([]);

watch(() => route.name, () => {
  selectedKeys.value = [route.name];
});
</script>

<style>
.container {
  background-color: #fff;
  padding: 24px;
  min-height: calc(100vh - 64px);
}
.text-center {
  text-align: center;
}
</style>