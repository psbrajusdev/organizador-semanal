<template>
  <table border="1" cellpadding="8">
    <thead>
      <tr>
        <th>Día</th>
        <th>Tareas</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="day in days" :key="day">
        <td>{{ day }}</td>
        <td>
          <ul>
            <li
              v-for="task in tasks.filter((t) => t.day === day)"
              :key="task.id"
            >
              {{ task.description }}
            </li>
          </ul>
        </td>
        <td>
          <input v-model="newTask[day]" placeholder="Nueva tarea" />
          <button @click="addTask(day)">Agregar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
const tasks = ref([]);
const newTask = ref({});

const fetchTasks = async () => {
  const res = await axios.get("interchange.proxy.rlwy.net:21208/tasks");
  tasks.value = res.data;
};

const addTask = async (day) => {
  if (!newTask.value[day]) return;
  const res = await axios.post("interchange.proxy.rlwy.net:21208/tasks", {
    day,
    description: newTask.value[day],
  });
  tasks.value.push(res.data);
  newTask.value[day] = "";
};

onMounted(fetchTasks);
</script>
