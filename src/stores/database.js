import { supabase } from "../supabase"
import { defineStore } from "pinia";
//import { nanoid } from "nanoid";
import router from "../router/index";

export const useDatabaseStore = defineStore('tasks', {
  state: () => ({
    documents: [],
    loadingDoc: false,
    loading: false,
  }),
  actions: {
    async fetchAllTasks() {
      const { data, error } = await supabase
      .from('tasks')
      .select()

      if (error) throw error;
      console.log(data)
      this.documents = data
    },

    async addTarea(title, user_id) {
      this.loading = true;
      try {
        const objetoDoc = {
          title: title,
          user_id: user_id,
          //short: nanoid(6),
          //user: supabase.auth.getUser().id,
        };
        const { data, error } = await supabase
        .from("tasks")
        .insert(objetoDoc)
        .select();

        if (error) {
          throw new Error(error.message);
        }
        this.documents.push(  
          data[0]  
        );
      } catch (error) {
        console.log(error.message);
        return error.message;
      } finally {
        this.loading = false;
      }
    },
    async leerTarea(id) {
      try {
        const { data, error } = await supabase
        .from("tasks")
        .select("name")
        .eq("id", id);
        if (error) {
          throw new Error(error.message);
        }

        if (data.length === 0) {
          throw new Error("no existe el doc");
        }

        if (data[0].user !== supabase.auth.getUser().id) {
          throw new Error("no le pertenece ese documento");
        }

        return data[0].title;
      } catch (error) {
        console.log(error.message);
      }
    },
    async updateTarea(id, title) {
      this.loading = true;
      try {
        const { data, error } = await supabase
        .from("tasks")
        .update({ title })
        .eq("id", id);
        if (error) {
          throw new Error(error.message);
        }

        if (data.length === 0) {
          throw new Error("no existe el doc");
        }

        if (data[0].user !== supabase.auth.getUser().id) {
          throw new Error("no le pertenece ese documento");
        }

        this.documents = this.documents.map((item) =>
          item.id === id ? { ...item, title: title } : item
        );
        router.push("/");
      } catch (error) {
        console.log(error.message);
        return error.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteTarea(id) {
      this.loading = true;
      try {
        const { data, error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);
        if (error) {
          throw new Error(error.message);
        }
    
        if (data.length === 0) {
          throw new Error("no existe el doc");
        }
    
        if (data[0].user !== supabase.auth.getUser().id) {
          throw new Error("no le pertenece ese documento");
        }
    
        this.documents = this.documents.filter((item) => item.id !== id);
      } catch (error) {
        console.log(error.message);
        return error.message;
      } finally {
        this.loading = false;
      }
    },

},
});