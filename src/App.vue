<template>
  <v-app>
    <v-app-bar>
      <v-toolbar-title>Catfish</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <HelloWorld />
      <div id="map" />
      <Map :points="points" metric="NITRATE" unit="mg/L" />
      <Bar :data="data" />
    </v-main>
  </v-app>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import Map from '@/components/Map.vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

// ChartJS example
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

const points = [
  { "LAT": 56.678, "LONG": 12.862, "NITRATE": 3 },
  { "LAT": 56.677, "LONG": 12.861, "NITRATE": 4 },
  { "LAT": 56.676, "LONG": 12.861, "NITRATE": 3 },
  { "LAT": 56.675, "LONG": 12.860, "NITRATE": 2 },
  { "LAT": 56.674, "LONG": 12.860, "NITRATE": 1 }
]
</script>
