<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">Home</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!userStore.user">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!userStore.user">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <li class="nav-item" v-if="userStore.user">
            <a class="nav-link" href="#" @click="handleSignOut">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div v-if="userStore.loadingSession" class="text-center"><span class="spinner-border"></span> Loading user...</div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "./stores/user";
import { useRouter, useRoute } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const selectedKeys = ref([]);

const handleSignOut = async () => {
  await userStore.signOut()
  router.push({ path: "/login" })
}
watch(() => route.name, () => {
  selectedKeys.value = [route.name];
});
</script>

<style>
.container {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.spinner-border {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  vertical-align: text-bottom;
  border: .25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border .75s linear infinite;
  animation: spinner-border .75s linear infinite;
}

@-webkit-keyframes spinner-border {
  to { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
}

@keyframes spinner-border {
  to { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
}
</style>