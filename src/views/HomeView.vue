Copy code
<template>
  <div class="container">
    <h1 class="my-5">Home Ruta protegida</h1>
    <p>{{ userStore.user?.email }}</p>

    <AddForm></AddForm>

    <p v-if="databaseStore.loadingDoc">loading docs...</p>

    <div class="my-5">
      <div v-if="!databaseStore.loadingDoc">
        <div v-for="item of databaseStore.documents" :key="item.id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <div class="mt-2">
              <div class="form-check form-check-inline">
                <input type="radio" id="radio-1" class="form-check-input" value="To-do" @click="handleIncompleteTask(item)">
                <lable for="radio-1" class="form-check-lable">To-do</lable>
              </div>
              <div class="form-check form-check-inline">
                <input type="radio" id="radio-2" class="form-check-input" value="Done" @click="handleCompleteTask(item)">
                <lable for="radio-2" class="form-check-lable">Done</lable>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <button type="button" class="btn btn-primary me-3" @click="router.push(`/editar/${item.id}`)">Editar</button>
                <div class="d-inline">
                  <button type="button" class="btn btn-danger" data-toggle="popover" data-trigger="focus" data-content="¿Estás seguro que deseas eliminar?" @click="confirm(item.id)">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";
import AddForm from '../components/AddForm.vue'

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();

const confirm = async (id) => {
  const { error } = await databaseStore.deleteTarea(id);
  if (!error) {
    alert("Se eliminó con éxito ");
  } else {
    alert(error);
  }
};

const handleCompleteTask = async (item) => {
  try {
    await databaseStore.completeTask({ id: item.id });
    item.is_complete = true;
  } catch (error) {
    alert(error);
  }
};

const handleIncompleteTask = async (item) => {
  try {
    await databaseStore.incompleteTask({ id: item.id });
  } catch (error) {
    alert(error);
  }
};

onBeforeMount(async () => {
  await databaseStore.fetchAllTasks();
});
</script>