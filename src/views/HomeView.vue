<script>
import userStore from '../stores/user.js';
import { mapActions, mapState } from 'pinia';
import TaskModal from '../components/TaskModal.vue';
  export default {
    name: "HomeView",
    components: {
      TaskModal
    },
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
    <h1>HOME VIEW</h1>
    <button @click="_handleLogOut">Log Out</button>
    <TaskModal />
  </main>
</template>