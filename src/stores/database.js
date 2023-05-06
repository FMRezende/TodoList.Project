import { supabase } from '../supabase'
import { defineStore } from 'pinia'

export const useDatabaseStore = defineStore('tasks', {
  state: () => ({
    documents: [],
    loadingDoc: false,
    loading: false
  }),
  actions: {
    async fetchAllTasks() {
      const { data, error } = await supabase.from('tasks').select()

      if (error) throw error
      console.log(data)
      this.documents = data
    },

    async addTarea(title, user_id) {
      this.loading = true
      try {
        const objetoDoc = {
          title: title,
          user_id: user_id
        }
        const { data, error } = await supabase.from('tasks').insert(objetoDoc).select()

        if (error) {
          throw new Error(error.message)
        }
        this.documents.push(data[0])
      } catch (error) {
        console.log(error.message)
        return error.message
      } finally {
        this.loading = false
      }
    },

    async editarTarea(id) {
      this.loading = true
      try {
        const { data, error } = await supabase.from('tasks').eq('id', id).select()
        if (error) {
          throw new Error(error.message)
        }
        if (data.length === 0) {
          throw new Error('No existe el doc')
        }
        if (data[0].user_id !== supabase.auth.user()?.id) {
          throw new Error('No le pertenece ese documento')
        }
        this.documents = [data[0]]
      } catch (error) {
        console.log(error.message)
        return error.message
      } finally {
        this.loading = false
      }
    },

    async updateTarea(id, title) {
      this.loading = true
      try {
        const { data, error } = await supabase.from('tasks').update({ title }).eq('id', id).select()
        if (error) {
          throw new Error(error.message)
        }
        if (data.length === 0) {
          throw new Error('No existe el doc')
        }
        if (data[0].user_id !== supabase.auth.user()?.id) {
          throw new Error('No le pertenece ese documento')
        }
        this.documents = this.documents.map((item) => (item.id === id ? { ...item, title } : item))
      } catch (error) {
        console.log(error.message)
        return error.message
      } finally {
        this.loading = false
      }
    },

    async completeTask(id) {
      console.log(id)
      const { error } = await supabase.from('tasks').update({ is_complete: true }).eq('id', id)

      if (error) throw error

      const index = this.documents.findIndex((task) => task.id === id)
      if (index !== -1) {
        this.documents[index].is_complete = true
      }
    },

    async incompleteTask(id) {
      const { error } = await supabase.from('tasks').update({ is_complete: false }).eq('id', id)

      if (error) throw error

      const index = this.documents.findIndex((task) => task.id === id)
      if (index !== -1) {
        this.documents[index].is_complete = false
      }
    },

    async deleteTarea(id) {
      const { error } = await supabase.from('tasks').delete().eq('id', id)

      if (error) throw error
      this.documents = this.documents.filter((item) => item.id !== id)
    },

    async _fetchTasks() {
      try {
        const { data: tasks, error } = await supabase
          .from('tasks')
          .select()
          .order('inserted_at', { ascending: false })
        if (error) throw error
        this.documents = tasks
      } catch (err) {
        console.error(err)
      }
    }
  }
})
