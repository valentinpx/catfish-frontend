<template>
  <v-app>
    <v-app-bar>
      <v-toolbar-title>Catfish</v-toolbar-title>
    </v-app-bar>
    <v-main class="mx-4">
      <v-form>
        <v-text-field v-model="idsString" label="CATFISH IDs" class="mt-4" />
        <div class="d-flex">
          <v-text-field v-model="from" type="date" label="FROM" class="pr-1" />
          <v-text-field v-model="to" type="date" label="TO" class="pl-1" />
        </div>
      </v-form>
      <div v-if="points" class="grid">
        <div v-for="(u, m) in units" class="item">
          <Chart :points="points" :metric="m" :unit="u" />
        </div>
        <div class="item-large">
          <v-select v-model="mapValue" :items="Object.keys(units)" label="Value" class="mt-4" />
          <Map :points="points" :metric="mapValue" :unit="units[mapValue] ?? ''" height="65%" />
        </div>
      </div>
      <div v-else class="text-center h-100 text-h4 mt-12">
        No data to show yet...
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Map from '@/components/Map.vue'
import Chart from '@/components/Chart.vue'

export default {
  name: 'App',
  components: {
    Map,
    Chart
  },
  data() {
    return {
      units: {
        "NITRATE": "mg/L",
        "TEMPERATURE": "°C",
        "TURBIDITY": "NTU",
        "OXYGEN": "mg/L",
        "CONDUCTIVITY": "µS/cm",
      },
      mapValue: "NITRATE",
      idsString: 'CATFISH_PROTOTYPE',
      from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10),
      to: new Date().toISOString().slice(0, 10),
      points: [
        { "TIME": "2023-04-27T04:20:00Z" , "LAT": 56.678, "LONG": 12.862, "NITRATE": 3, "TEMPERATURE": 15, "TURBIDITY": 2, "OXYGEN": 20 },
        { "TIME": "2023-04-27T04:23:11Z" , "LAT": 56.677, "LONG": 12.861, "NITRATE": 4, "TEMPERATURE": 28, "OXYGEN": 20 },
        { "TIME": "2023-04-27T04:42:41Z" , "LAT": 56.676, "LONG": 12.861, "NITRATE": 3, "TURBIDITY": 14, "OXYGEN": 30, "CONDUCTIVITY": 0.32 },
        { "TIME": "2023-04-27T05:01:03Z" , "LAT": 56.675, "LONG": 12.860, "NITRATE": 2, "OXYGEN": 13, "CONDUCTIVITY": 0.4 },
        { "TIME": "2023-04-27T05:12:12Z" , "LAT": 56.674, "LONG": 12.860, "NITRATE": 1, "CONDUCTIVITY": 0.3 }
      ]
    }
  },
  mounted() {
    setInterval(this.fetchData, 5000)
  },
  methods: {
    fetchData() {
      if (!this.from || !this.to || !this.idsString) return
      // TODO: fetch data from backend
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
}

.item {
  height: 400px;
}

.item-large {
  grid-column: 1 / 3;
  height: 400px;
}
</style>
