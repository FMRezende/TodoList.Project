<script>
import userStore from '../stores/user.js';
import { mapActions, mapState } from 'pinia';

  export default {
    name: "HomeView",
    data () {
      return {}
    },
    computed: {
      ...mapState(userStore, ['user']),
    },
    methods: {
      ...mapActions(userStore, ['signOut']),
      async _handleLogOut() {
        try {
          await this.signOut()
          this.$router.push({ name: 'signIn' })
        } catch(err) {
          console.error(err)
        }
      }
    }
  }
</script>
<template>
  <main>
    <h1>Home View </h1>
    <button @click="_handleLogOut">Log Out</button>
  </main>
</template>