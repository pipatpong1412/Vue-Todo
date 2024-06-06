import axios from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = import.meta.env.VITE_API_URL

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ['Pending', 'Doing', 'Done']
  }),
  actions: {
    async loadTodos() {
      try {
        const res = await axios.get(`${BASE_URL}/todos`)
        this.list = res.data

      } catch (error) {
        console.log(error)
      }
    },
    async loadTodo(id) {
      try {
        const res = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedTodo = res.data

      } catch (error) {
        console.log(error)
      }
    },
    async addTodo(todoText) {
      const bodyData = {
        name: todoText,
        status: 'Pending'
      }

      try {
        const res = await axios.post(`${BASE_URL}/todos/`, bodyData)
        this.list.push(res.data)

      } catch (error) {
        console.log(error)
      }
    },
    async editTodo(todoData, id) {



      try {
        const res = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
        this.selectedTodo = res.data

      } catch (error) {
        console.log(error)
      }
    },
    async deleteTodo(id) {
      try {
        await axios.delete(`${BASE_URL}/todos/${id}`)

      } catch (error) {
        console.log(error)
      }
    }
  }
})
