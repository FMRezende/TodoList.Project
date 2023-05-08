<template>
  <div class="container py-5">
    <h1 class="my-5 text-primary">Home Ruta protegida</h1>
    <p class="mb-4">Welcome, {{ userStore.user?.email }}</p>

    <AddForm></AddForm>

    <p v-if="databaseStore.loadingDoc">Loading documents...</p>

    <div class="my-5">
      <div v-if="!databaseStore.loadingDoc">
        <div v-for="item of databaseStore.documents" :key="item.id" class="card mb-3 shadow">
          <div class="card-body">
            <h5 class="card-title text-primary">{{ item.title }}</h5>
            <div class="mt-2">
              <div class="form-check form-check-inline">
                <input type="radio" id="radio-1" class="form-check-input" value="To-do"
                  :checked="itemSelections[item.id] === 'To-do'" @click="handleIncompleteTask(item)">
                <label for="radio-1" class="form-check-label text-primary">To-do</label>
              </div>
              <div class="form-check form-check-inline">
                <input type="radio" id="radio-2" class="form-check-input" value="Done"
                  :checked="itemSelections[item.id] === 'Done'" @click="handleCompleteTask(item)">
                <label for="radio-2" class="form-check-label text-success">Done</label>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <div>
                <button type="button" class="btn btn-primary mr-3"
                  @click="router.push(`/editar/${item.id}`)">Edit</button>
                <div class="d-inline">
                  <button type="button" class="btn btn-danger" data-toggle="popover" data-trigger="focus"
                    data-content="Are you sure you want to delete?" @click="confirm(item.id)">Delete</button>
                </div>
              </div>
              <div class="text-black-50">{{ item.createdAt }}</div>
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
import { onBeforeMount, ref } from "vue";
import AddForm from '../components/AddForm.vue'

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();

const itemSelections = ref({});

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
    await databaseStore.completeTask(item.id);
    itemSelections.value[item.id] = 'Done';
    localStorage.setItem(`selectedStatus-${item.id}`, 'Done'); // Add this line
  } catch (error) {
    alert(error);
  }
};

const handleIncompleteTask = async (item) => {
  try {
    await databaseStore.incompleteTask(item.id);
    itemSelections.value[item.id] = 'To-do';
    localStorage.setItem(`selectedStatus-${item.id}`, 'To-do'); // Add this line
  } catch (error) {
    alert(error);
  }
}

onBeforeMount(async () => {
  await databaseStore.fetchAllTasks();
  databaseStore.documents.forEach(item => {
    const selectedStatus = localStorage.getItem(`selectedStatus-${item.id}`);
    if (selectedStatus) {
      itemSelections.value[item.id] = selectedStatus;
    }
  });
});
</script>