<template>
    <form @submit.prevent="onFinish" autocomplete="off">
      <div class="mb-3">
        <label class="form-label">Ingrese una tarea</label>
        <input
          type="text"
          class="form-control"
          v-model="formState.tarea"
          required
        />
      </div>
      <button
        v-if="!databaseStore.loading"
        type="submit"
        class="btn btn-primary"
        :disabled="databaseStore.loading"
      >
        Agregar Tarea
      </button>
      <span v-else class="spinner-border spinner-border-sm"></span>
    </form>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  import { useDatabaseStore } from "../stores/database";
  import { useUserStore } from "../stores/user";
  import { message } from "ant-design-vue";
  
  const userStore = useUserStore();
  const databaseStore = useDatabaseStore();
  
  const formState = reactive({
    tarea: "",
    user_id: userStore.user.id,
  });
  
  const onFinish = async () => {
    const error = await databaseStore.addTarea(formState.tarea, formState.user_id);
    if (!error) {
      formState.tarea = "";
      message.success("Tarea agregada ");
    } else {
      message.error("Ocurrió un error en el servidor. Por favor, intenta nuevamente.");
    }
  };
  </script>