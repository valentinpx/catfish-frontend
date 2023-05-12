<template>
  <v-app>
    <v-app-bar>
      <v-toolbar-title>Catfish</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <HelloWorld />
      <Bar :data="data" />
    </v-main>
  </v-app>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const data = {
  labels: [ 'January', 'February', 'March'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 12]
    }
  ]
}
</script>
