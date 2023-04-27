<!--<template>
    <a-modal title="Create Task" v-model="visible" @ok="createTask" @cancel="cancel">
      <a-form ref="form" :form="form">
        <a-form-item label="Task Name">
          <a-input v-model="form.name"></a-input>
        </a-form-item>
        <a-form-item label="Description">
          <a-input v-model="form.description"></a-input>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button key="back" @click="cancel">Cancel</a-button>
        <a-button key="submit" type="primary" @click="createTask">
          Create
        </a-button>
      </template>
    </a-modal>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    props: {
      visible: {
        type: Boolean,
        required: true
    },
  },
  setup(props, { emit }) {
    const form = ref(null);

    const createTask = () => {
      form.value
        .validate()
        .then(() => {
          const task = {
            name: form.value.getFieldValue('name'),
            description: form.value.getFieldValue('description'),
          };
          emit('create', task);
        })
        .catch(() => {});
    };

    const cancel = () => {
      emit('cancel');
    };

    return {
      form,
      createTask,
      cancel,
    };
  },
});
</script>

<style scoped>
</style>-->
<template>
    <div>

    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>