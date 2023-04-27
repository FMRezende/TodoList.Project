
<!--<template>
    <a-modal title="Delete Task" v-model="visible" @ok="deleteTask" @cancel="cancel">
      <p>Are you sure you want to delete this task?</p>
      <p>{{ task.name }}</p>
      <template #footer>
        <a-button key="back" @click="cancel">Cancel</a-button>
        <a-button key="submit" type="primary" @click="deleteTask">
          Delete
        </a-button>
      </template>
    </a-modal>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      task: {
        type: Object,
        required: true,
      },
    },
    setup(props, { emit }) {
      const deleteTask = () => {
        emit('delete', props.task);
      };
  
      const cancel = () => {
        emit('cancel');
      };
  
      return {
        deleteTask,
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