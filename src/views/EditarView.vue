<template>
  <div class="container mt-5">
    <h4 class="text-primary">Editar tarea con ID: {{ route.params.id }}</h4>
    <form @submit.prevent="onFinish" class="mt-3">
      <div class="form-group">
        <label for="tarea" class="text-dark">Ingrese una tarea</label>
        <input
          type="text"
          class="form-control"
          id="tarea"
          v-model="formState.tarea"
          :class="{'is-invalid': formErrors.tarea}"
          required
        />
        <div class="invalid-feedback">{{ formErrors.tarea }}</div>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="databaseStore.loading || formErrors.tarea"
      >
        {{ databaseStore.loading ? 'Cargando...' : 'Editar Tarea' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";
import router from "../router/index";

const databaseStore = useDatabaseStore();
const route = useRoute();

const formState = reactive({
  tarea: "",
});
const formErrors = reactive({
  tarea: null,
});

const onFinish = async () => {
  if (!validateForm()) {
    return;
  }

  const error = await databaseStore.updateTarea(route.params.id, formState.tarea);
  if (!error) {
      formState.tarea = "";
      alert("Tarea editada");
  }
  router.push({path: "/"});
 
};

const validateForm = () => {
  let isValid = true;
  if (formState.tarea.trim() === "") {
    formErrors.tarea = "La tarea es requerida";
    isValid = false;
  } else {
    formErrors.tarea = null;
  }
  return isValid;
};

onMounted(async () => {
  const { documents } = databaseStore;
  const task = documents.find((task) => task.id === route.params.id);
  if (task) {
      formState.tarea = task.task;
  }
});
</script>

<style>
  .container {
    max-width: 500px;
  }

  label {
    font-weight: bold;
  }

  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }

  .btn-primary:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }

  .btn-primary:active {
    background-color: #0062cc;
    border-color: #005cbf;
  }

  .btn-primary:focus {
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
  }

  .text-primary {
    color: #007bff;
  }

  .text-dark {
    color: #343a40;
  }

  input[type="text"]:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
  }

  .is-invalid {
    border-color: #dc3545;
  }
</style>