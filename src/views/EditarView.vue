<template>
    <div>
      <h1>Editar id: {{ route.params.id }}</h1>
      <form @submit.prevent="onFinish">
        <div class="form-group">
          <label for="tarea">Ingrese una Tarea</label>
          <input
            type="text"
            class="form-control"
            id="tarea"
            v-model="formState.tarea"
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="databaseStore.loading"
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

const onFinish = async () => {
    console.log("todo correcto");
    const error = await databaseStore.updateTarea(route.params.id, formState.tarea);
    if (!error) {
        formState.tarea = "";
        alert("Tarea editada");
    }
    router.push({path: "/"});

    switch (error) {
        // buscar errores de firestore
        default:
            alert(
                "Ocurrió un error en el servidor intentelo más tarde..."
            );
            break;
    }
};

onMounted(async () => {
    
    const { documents } = databaseStore;
    const task = documents.find((task) => task.id === route.params.id);
    if (task) {
        formState.tarea = task.task;
    }
});
</script>