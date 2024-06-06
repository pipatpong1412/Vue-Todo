<script setup>
import { useTodoStore } from '@/stores/todo';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const todoStore = useTodoStore()
const route = useRoute()
const todoId = ref(-1)
const isLoaded = ref(false)
const router = useRouter()
const isUpdated = ref(false)

onMounted(async () => {
    await todoStore.loadTodo(route.params.id)
    isLoaded.value = true
    todoId.value = parseInt(route.params.id)
})

const editTodo = async (selectedTodo) => {
    try {
        const bodyData = {
            name: selectedTodo.name,
            status: selectedTodo.status
        }
        await todoStore.editTodo(bodyData, todoId.value)
        isUpdated.value = true
        setTimeout(() => {
            isUpdated.value = false
        }, 2000)
        // router.push({ name: 'todo-list' })

    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <div class="w-1/2 flex flex-col gap-2 mx-auto">
        <div v-if="isUpdated" class="toast toast-top toast-start">
            <div class="alert alert-success">
                <span>Update successfully.</span>
            </div>
        </div>
        <div v-if="isLoaded">
            Edit id
            <div class="badge badge-primary">{{ todoId }}</div>
        </div>
        <div class="form-control w-full">
            <label>
                <div class="label">
                    <span class="label-text">Name</span>
                </div>
                <input type="text" v-model="todoStore.selectedTodo.name" class="input input-bordered w-full max-w-xs" />
                <div class="label">
                </div>
            </label>
        </div>
        <div class="form-control w-full">
            Status
            <select class="select select-bordered w-full" v-model="todoStore.selectedTodo.status">
                <option disabled selected>Who shot first?</option>
                <option :value="status" v-for="status in todoStore.statuses">{{ status }}</option>
            </select>
        </div>
        <button class="btn btn-primary w-full mt-2 text-white" @click="editTodo(todoStore.selectedTodo)">Edit</button>
    </div>
</template>