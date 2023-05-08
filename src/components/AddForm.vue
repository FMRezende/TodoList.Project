<template>
  <form @submit.prevent="onFinish" autocomplete="off" class="mb-3">
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="floatingInput"
        v-model="formState.tarea"
        required
      />
      <label for="floatingInput">Ingrese una tarea</label>
    </div>
    <button
      v-if="!databaseStore.loading"
      type="submit"
      class="btn btn-primary btn-lg"
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
    alert("Tarea agregada ");
  } else {
    alert("Ocurrió un error en el servidor. Por favor, intenta nuevamente.");
  }
};
</script>