<!--<template>
    <a-modal title="Edit Task" v-model="visible" @ok="updateTask" @cancel="cancel">
      <a-form ref="form" :form="form" :initialValues="initialValues">
        <a-form-item label="Task Name">
          <a-input v-model="form.name"></a-input>
        </a-form-item>
        <a-form-item label="Description">
          <a-input v-model="form.description"></a-input>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button key="back" @click="cancel">Cancel</a-button>
        <a-button key="submit" type="primary" @click="updateTask">
          Update
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
        required: true,
      },
      initialValues: {
        type: Object,
        required: true,
      },
    },
    setup(props, { emit }) {
      const form = ref(null);
  
      const updateTask = () => {
        form.value
          .validate()
          .then(() => {
            const task = {
              id: props.initialValues.id,
              name: form.value.getFieldValue('name'),
              description: form.value.getFieldValue('description'),
            };
            emit('update', task);
          })
          .catch(() => {});
      };
  
      const cancel = () => {
        emit('cancel');
      };
  
      return {
        form,
        updateTask,
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