import { defineStore } from 'pinia'
import supabase from '../supabase'

export default defineStore('tasks', {
  state() {
    return {
      tasksList: []
    }
  },
  actions: {
    async _fetchAllTasks() {
      const { data, error } = await supabase
      .from('tasks')
      .select()

      if (error) throw error;
      console.log(data)
      this.tasksList = data
    },
    async _addNewTask({ title, user_id }) {
      const { data, error } = await supabase
        .from('tasks')
        .insert({ title, user_id })
        .select();

        if (error) throw error;
        this.tasksList.push(...data)
    },
    async _editTask({ title, id }){
      const { data, error } = await supabase
        .from('tasks')
        .update({ title })
        .eq('id', id)
        .select()

      if (error) throw error;

      const [task] = data;
      this.tasksList.forEach(todo => {
        if (todo.id === task.id) {
          todo.title = task.title;
        }
      })
    },


  },
})
