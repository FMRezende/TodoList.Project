<script>
import { mapState, mapActions } from 'pinia';
import TodoStore from '../stores/tasks';
import UserStore from '../stores/user.js';
import supabase from '../supabase'
export default {
    name: 'MyTable',
    data() {
        return {
            newTaskTitle: '',
            updateTaskTitle: '',
            updatingTask: null,
        }
    },
    computed: {
        ...mapState(TodoStore, ['tasksList']),
        ...mapState(UserStore, ['user']),
    },
    methods: {
        ...mapActions(TodoStore, ['_fetchAllTasks', '_addNewTask', '_editTask']),
        async _handleNewTask() {
            try {
                await this._addNewTask({ title: this.newTaskTitle, user_id: this.user.id })
                this.newTaskTitle = ''
            } catch (err) {
                console.error(err)
            }
        },
        _handleEditTask(todo) {
            this.updatingTask = todo;
            this.updateTaskTitle = this.updatingTask.title;
        },
        async _handleUpdateTask() {
            try {
                await this._editTask({ title: this.updateTaskTitle, id: this.updatingTask.id })
                this.updatingTask = null;
                this.updateTaskTitle = '';
            } catch (err) {
                console.error(err)
            }
        },
        async deleteTask(title, userId) {
        const { error } = await supabase
      .from('countries')
      .delete({ title, user_Id: userId })
      .eq('id', 1)
    if (error) {
      console.error(error)
      return
    }
    console.log()
  }
    },
    created() {
        console.log('created en MyTable')
        this._fetchAllTasks()
    },
}
</script>

<template>
    <div>
        <h1>Lista de tareas</h1>
        <table>
            <thead>
                <tr>
                    <th>Tarea</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="todo in tasksList" :key="todo.id">
                    <td>{{ todo.title }}</td>
                    <td>
                        <button @click="_handleUpdateTask(todo)">Editar</button>
                        <button @click="deleteTask(todo.id)">Eliminar</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" v-model='newTaskTitle' />
                    </td>
                    <td>
                        <button @click="_handleNewTask()">Agregar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        
    </div>
    </template>