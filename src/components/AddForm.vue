<template>
  <form @submit.prevent="onFinish" autocomplete="off" class="mb-3">
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="floatingInput"
        v-model="formState.tarea"
        :class="{'is-invalid': !validTarea}"
        required
      />
      <label for="floatingInput">Ingrese una tarea</label>
      <div class="invalid-feedback">
        Por favor, ingrese una tarea válida.
      </div>
    </div>
    <button
      v-if="!databaseStore.loading"
      type="submit"
      class="btn btn-primary btn-lg"
      :disabled="databaseStore.loading || !validTarea"
    >
      Agregar Tarea
    </button>
    <span v-else class="spinner-border spinner-border-sm"></span>
  </form>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useDatabaseStore } from "../stores/database";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const databaseStore = useDatabaseStore();

const formState = reactive({
  tarea: "",
  user_id: userStore.user.id,
});

const validTarea = computed(() => {
  const tarea = formState.tarea.trim();
  return tarea !== "" && tarea.length <= 50;
});

const onFinish = async () => {
  if (!validTarea.value) return;

  const error = await databaseStore.addTarea(formState.tarea, formState.user_id);
  if (!error) {
    formState.tarea = "";
    alert("Tarea agregada ");
  } else {
    alert("Ocurrió un error en el servidor. Por favor, intenta nuevamente.");
  }
};
</script>