<!--<template>
    <div class="container">
      <h2>Task List</h2>
      <div v-if="user">
        <div class="user-info">Logged in as: {{ user.email }}</div>
        <a-form @submit.prevent="handleAddTask">
          <a-form-item label="New Task">
            <a-input v-model:value="newTask" required />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">Add Task</a-button>
          </a-form-item>
        </a-form>
        <ul>
          <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
            <a-checkbox @change="() => handleToggleTask(task.id)" :checked="task.completed">{{ task.title }}</a-checkbox>
            <a-button @click="() => handleEditTask(task)">Edit</a-button>
            <a-button @click="() => handleDeleteTask(task.id)">Delete</a-button>
          </li>
        </ul>
        <a-button @click="handleSignOut">Sign Out</a-button>
      </div>
      <div v-else>
        <router-link to="/signin">Sign In</router-link>
        <router-link to="/signup">Sign Up</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useTaskStore } from '@/stores/task';
  import { notification } from 'ant-design-vue';
  
  export default defineComponent({
    setup() {
      const userStore = useUserStore();
      const taskStore = useTaskStore();
  
      // Form data
      const newTask = ref('');
  
      // Event handlers
      const handleSignOut = async () => {
        try {
          await userStore.signOut();
        } catch (error) {
          console.error(error);
        }
      };
  
      const handleAddTask = async () => {
        try {
          await taskStore.createTask(newTask.value);
          newTask.value = '';
        } catch (error) {
          console.error(error);
        }
      };
  
      const handleToggleTask = async (taskId) => {
        try {
          await taskStore.toggleTask(taskId);
        } catch (error) {
          console.error(error);
        }
      };
  
      const handleEditTask = async (task) => {
        try {
          const updatedTaskTitle = await notification.open({
            title: 'Edit Task',
            content: h('a-input', { modelValue: task.title, autofocus: true }),
            okText: 'Save',
            onOk: async () => {
              const newTitle = updatedTaskTitle.vnode.component.proxy.$attrs.modelValue;
              if (newTitle.trim() === '') {
                notification.error({ message: 'Task title cannot be empty' });
                return;
              }
              await taskStore.updateTask(task.id, newTitle);
              notification.success({ message: 'Task updated successfully' });
            },
          });
        } catch (error) {
          console.error(error);
        }
      };
  
      const handleDeleteTask = async (taskId) => {
        try {
          await taskStore.deleteTask(taskId);
          notification.success({ message: 'Task deleted successfully' });
        } catch (error) {
          console.error(error);
        }
      }
    }   
    
    Este codigo estava primeiro  -->

    <!--Este codigo foi o segundo
    <template>
        <div class="task-list">
          <h1 class="title">Task List</h1>
          <a-button type="primary" @click="createTaskModalVisible = true">Create Task</a-button>
          <a-table :columns="columns" :data-source="tasks" row-key="id">
            <template #actions="scope">
              <a-space size="small">
                <a-button type="link" @click="editTask(scope.record)">Edit</a-button>
                <a-button type="link" @click="deleteTask(scope.record)">Delete</a-button>
              </a-space>
            </template>
          </a-table>
          <create-task-modal
            :visible.sync="createTaskModalVisible"
            @create="createTask"
          ></create-task-modal>
          <edit-task-modal
            :visible.sync="editTaskModalVisible"
            :task="selectedTask"
            @update="updateTask"
          ></edit-task-modal>
        </div>
      </template>
      
      <script>
      import { defineComponent, ref, onMounted } from 'vue';
      import { useSupabase, useAuth } from 'vue-supabase';
      import { useRouter } from 'vue-router';
      
      export default defineComponent({
        setup() {
          const { supabase } = useSupabase();
          const { user } = useAuth();
          const router = useRouter();
      
          const tasks = ref([]);
          const createTaskModalVisible = ref(false);
          const editTaskModalVisible = ref(false);
          const selectedTask = ref(null);
      
          const fetchTasks = async () => {
            const { data, error } = await supabase.from('tasks').select('*').eq('user_id', user.value?.id);
            if (error) {
              console.error('Failed to fetch tasks:', error);
            } else {
              tasks.value = data;
      }
    };

    const createTask = async (task) => {
      const { data, error } = await supabase.from('tasks').insert(task).single();
      if (error) {
        console.error('Failed to create task:', error);
        this.$message.error('Failed to create task. Please try again.');
      } else {
        tasks.value.push(data);
        createTaskModalVisible.value = false;
        this.$message.success('Task created successfully.');
      }
    };

    const editTask = (task) => {
      selectedTask.value = { ...task };
      editTaskModalVisible.value = true;
    };

    const updateTask = async (task) => {
      const { data, error } = await supabase
        .from('tasks')
        .update(task)
        .eq('id', selectedTask.value.id)
        .single();
      if (error) {
        console.error('Failed to update task:', error);
        this.$message.error('Failed to update task. Please try again.');
      } else {
        const index = tasks.value.findIndex((t) => t.id === data.id);
        tasks.value.splice(index, 1, data);
        editTaskModalVisible.value = false;
        this.$message.success('Task updated successfully.');
      }
    };

    const deleteTask = async (task) => {
      const { error } = await supabase.from('tasks').delete().eq('id', task.id);
      if (error) {
        console.error('Failed to delete task:', error);
        this.$message.error('Failed to delete task. Please try again.');
      } else {
        tasks.value = tasks.value.filter((t) => t.id !== task.id);
        this.$message.success('Task deleted successfully.');
      }
    };

    onMounted(() => {
      fetchTasks();
    });

    const columns = [
      {
        title: 'Task Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Actions',
        key: 'actions',
        slots: { customRender: 'actions' },
      },
    ];

    return {
      tasks,
      columns,
      createTaskModalVisible,
      editTaskModalVisible,
      selectedTask,
      createTask,
      editTask,
      updateTask,
      deleteTask,
    };
  },
});
</script>

<style scoped>
.task-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.title {
  margin: 0 0 1rem 0;
}
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
<!--<template>
  <div class="container">
    <h1>TodoList App</h1>
    <div v-if="!user">
      <h3>Please sign up or sign in</h3>
      <router-link to="/sign-up">Sign Up</router-link>
      <router-link to="/sign-in">Sign In</router-link>
    </div>
    <div v-else>
      <div class="user-info">
        <p>Logged in as: {{ user.email }}</p>
        <button @click="handleSignOut">Sign out</button>
      </div>
      <TaskList
        :tasks="tasks"
        @addTask="handleAddTask"
        @editTask="handleEditTask"
        @toggleTask="handleToggleTask"
        @deleteTask="handleDeleteTask"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import { useTaskStore } from '@/stores/task';
import TaskList from '@/components/TaskList.vue';

export default defineComponent({
  components: {
    TaskList,
  },
  setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();

    // Fetch tasks when user is authenticated
    if (userStore.isAuthenticated) {
      taskStore.fetchTasks();
    }

    // Event handlers
    const handleSignOut = async () => {
      try {
        await userStore.signOut();
      } catch (error) {
        console.error(error);
      }
    };

    const handleAddTask = async (task) => {
      try {
        await taskStore.addTask(task);
      } catch (error) {
        console.error(error);
      }
    };

    const handleEditTask = async (task) => {
      try {
        await taskStore.editTask(task);
      } catch (error) {
        console.error(error);
      }
    };

    const handleToggleTask = async (task) => {
      try {
        await taskStore.toggleTask(task);
      } catch (error) {
        console.error(error);
      }
    };

    const handleDeleteTask = async (taskId) => {
      try {
        await taskStore.deleteTask(taskId);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      user: userStore.user,
      tasks: taskStore.tasks,
      handleSignOut,
      handleAddTask,
      handleEditTask,
      handleToggleTask,
      handleDeleteTask,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.user-info {
  margin-bottom: 20px;
}

button {
  margin-top: 10px;
}
</style>


views/TaskList.vue:

html
Copy code
<template>
  <div class="container">
    <h2>Task List</h2>
    <div v-if="user">
      <div class="user-info">Logged in as: {{ user.email }}</div>
      <form @submit.prevent="handleAddTask">
        <div>
          <label for="new-task">New Task:</label>
          <input type="text" id="new-task" v-model="newTask" required />
        </div>
        <div>
          <button type="submit">Add Task</button>
        </div>
      </form>
      <ul>
        <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
          <input type="checkbox" @change="() => handleToggleTask(task.id)" :checked="task.completed" />
          {{ task.title }}
          <button @click="() => handleEditTask(task)">Edit</button>
          <button @click="() => handleDeleteTask(task.id)">Delete</button>
        </li>
      </ul>
      <button @click="handleSignOut">Sign Out</button>
    </div>
    <div v-else>
      <router-link to="/signin">Sign In</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import { useTaskStore } from '@/stores/task';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();

    // Form data
    const newTask = ref('');

    // Event handlers
    const handleSignOut = async () => {
      try {
        await






views/TaskList.vue:

html
Copy code
<template>
  <div class="container">
    <h2>Task List</h2>
    <div v-if="user">
      <div class="user-info">Logged in as: {{ user.email }}</div>
      <form @submit.prevent="handleAddTask">
        <div>
          <label for="new-task">New Task:</label>
          <input type="text" id="new-task" v-model="newTask" required />
        </div>
        <div>
          <button type="submit">Add Task</button>
        </div>
      </form>
      <ul>
        <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
          <input type="checkbox" @change="() => handleToggleTask(task.id)" :checked="task.completed" />
          {{ task.title }}
          <button @click="() => handleEditTask(task)">Edit</button>
          <button @click="() => handleDeleteTask(task.id)">Delete</button>
        </li>
      </ul>
      <button @click="handleSignOut">Sign Out</button>
    </div>
    <div v-else>
      <router-link to="/signin">Sign In</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import { useTaskStore } from '@/stores/task';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();

    // Form data
    const newTask = ref('');

    // Event handlers
    const handleSignOut = async () => {
      try {
        await





views/TaskList.vue:

html
Copy code
<template>
  <div class="container">
    <h2>Task List</h2>
    <div v-if="user">
      <div class="user-info">Logged in as: {{ user.email }}</div>
      <form @submit.prevent="handleAddTask">
        <div>
          <label for="new-task">New Task:</label>
          <input type="text" id="new-task" v-model="newTask" required />
        </div>
        <div>
          <button type="submit">Add Task</button>
        </div>
      </form>
      <ul>
        <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
          <input type="checkbox" @change="() => handleToggleTask(task.id)" :checked="task.completed" />
          {{ task.title }}
          <button @click="() => handleEditTask(task)">Edit</button>
          <button @click="() => handleDeleteTask(task.id)">Delete</button>
        </li>
      </ul>
      <button @click="handleSignOut">Sign Out</button>
    </div>
    <div v-else>
      <router-link to="/signin">Sign In</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import { useTaskStore } from '@/stores/task';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();

    // Form data
    const newTask = ref('');

    // Event handlers
    const handleSignOut = async () => {
      try {
        await





views/TaskList.vue:

html
Copy code
<template>
  <div class="container">
    <h2>Task List</h2>
    <div v-if="user">
      <div class="user-info">Logged in as: {{ user.email }}</div>
      <form @submit.prevent="handleAddTask">
        <div>
          <label for="new-task">New Task:</label>
          <input type="text" id="new-task" v-model="newTask" required />
        </div>
        <div>
          <button type="submit">Add Task</button>
        </div>
      </form>
      <ul>
        <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
          <input type="checkbox" @change="() => handleToggleTask(task.id)" :checked="task.completed" />
          {{ task.title }}
          <button @click="() => handleEditTask(task)">Edit</button>
          <button @click="() => handleDeleteTask(task.id)">Delete</button>
        </li>
      </ul>
      <button @click="handleSignOut">Sign Out</button>
    </div>
    <div v-else>
      <router-link to="/signin">Sign In</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import { useTaskStore } from '@/stores/task';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();

    // Form data
    const newTask = ref('');

    // Event handlers
    const handleSignOut = async





views/TaskList.vue:

html
Copy code
<template>
  <div class="container">
    <h2>Task List</h2>
    <div v-if="user">
      <div class="user-info">Logged in as: {{ user.email }}</div>
      <form @submit.prevent="handleAddTask">
        <div>
          <label for="new-task">New Task:</label>
          <input type="text" id="new-task" v-model="newTask" required />
        </div>
        <div>
          <button type="submit">Add Task</button>
        </div>
      </form>
      <ul>
        <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
          <input type="checkbox" @change="() => handleToggleTask(task.id)" :checked="task.completed" />
          {{ task.title }}
          <button @click="() => handleEditTask(task)">Edit</button>
          <button @click="() => handleDeleteTask(task.id)">Delete</button>
        </li>
      </ul>
      <button @click="handleSignOut">Sign Out</button>
    </div>
    <div v-else>
      <router-link to="/signin">Sign In</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import { useTaskStore } from '@/stores/task';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();

    // Form data
    const newTask = ref('');

    // Event handlers
    const handleSignOut = async





views/TaskList.vue:

html
Copy code
<template>
  <div class="container">
    <h2>Task List</h2>
    <div v-if="user">
      <div class="user-info">Logged in as: {{ user.email }}</div>
      <form @submit.prevent="handleAddTask">
        <div>
          <label for="new-task">New Task:</label>
          <input type="text" id="new-task" v-model="newTask" required />
        </div>
        <div>
          <button type="submit">Add Task</button>
        </div>
      </form>
      <ul>
        <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
          <input type="checkbox" @change="() => handleToggleTask(task.id)" :checked="task.completed" />
          {{ task.title }}
          <button @click="() => handleEditTask(task)">Edit</button>
          <button @click="() => handleDeleteTask(task.id)">Delete</button>
        </li>
      </ul>
      <button @click="handleSignOut">Sign Out</button>
    </div>
    <div v-else>
      <router-link to="/signin">Sign In</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import { useTaskStore } from '@/stores/task';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();

    // Form data
    const newTask = ref('');

    // Event handlers
    const handleSignOut = async





php
Copy code
<template>
  <div class="container">
    <h2>Task List</h2>
    <div v-if="user">
      <div class="user-info">Logged in as: {{ user.email }}</div>
      <a-form @submit.prevent="handleAddTask">
        <a-form-item label="New Task">
          <a-input v-model:value="newTask" required />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">Add Task</a-button>
        </a-form-item>
      </a-form>
      <ul>
        <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
          <a-checkbox @change="() => handleToggleTask(task.id)" :checked="task.completed">{{ task.title }}</a-checkbox>
          <a-button @click="() => handleEditTask(task)">Edit</a-button>
          <a-button @click="() => handleDeleteTask(task.id)">Delete</a-button>
        </li>
      </ul>
      <a-button @click="handleSignOut">Sign Out</a-button>
    </div>
    <div v-else>
      <router-link to="/signin">Sign In</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import { useTaskStore } from '@/stores/task';
import { notification } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();

    // Form data
    const newTask = ref('');

    // Event handlers
    const handleSignOut = async () => {
      try {
        await userStore.signOut();
      } catch (error) {
        console.error(error);
      }
    };

    const handleAddTask = async () => {
      try {
        await taskStore.createTask(newTask.value);
        newTask.value = '';
      } catch (error) {
        console.error(error);
      }
    };

    const handleToggleTask = async (taskId) => {
      try {
        await taskStore.toggleTask(taskId);
      } catch (error) {
        console.error(error);
      }
    };

    const handleEditTask = async (task) => {
      try {
        const updatedTaskTitle = await notification.open({
          title: 'Edit Task',
          content: h('a-input', { modelValue: task.title, autofocus: true }),
          okText: 'Save',
          onOk: async () => {
            const newTitle = updatedTaskTitle.vnode.component.proxy.$attrs.modelValue;
            if (newTitle.trim() === '') {
              notification.error({ message: 'Task title cannot be empty' });
              return;
            }
            await taskStore.updateTask(task.id, newTitle);
            notification.success({ message: 'Task updated successfully' });
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    const handleDeleteTask = async (taskId) => {
      try {
        await taskStore.deleteTask(taskId);
        notification.success({ message: 'Task deleted successfully' });
      } catch 
<template>
  <div>
    <h1>Todo List</h1>
    <div v-if="user">
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Enter a new task..." />
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <input type="checkbox" v-model="task.completed" @change="updateTask(task)" />
          {{ task.description }}
          <button @click="deleteTask(task)">Delete</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useTasksStore } from '@/store/tasks';
import { useUserStore } from '@/store/user';

export default defineComponent({
  setup() {
    const tasksStore = useTasksStore();
    const userStore = useUserStore();

    return {
      tasks: tasksStore.tasks,
      newTask: '',
      user: userStore.user,
      addTask() {
        tasksStore.addTask(this.newTask);
        this.newTask = '';
      },
      updateTask(task) {
        tasksStore.updateTask(task);
      },
      deleteTask(task) {
        tasksStore.deleteTask(task);
      },
      login() {
        userStore.login();
      }
    };
  }
});

Revisar tudo primeiro -->