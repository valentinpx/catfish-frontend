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
      <div class="grid">
        <div class="item-large">
          <Map :points="points" metric="NITRATE" unit="mg/L" height="90%" />
        </div>
        <div class="item">
          graph
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Map from '@/components/Map.vue'

var from = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10)
var to = new Date().toISOString().slice(0, 10)

export default {
  name: 'App',
  components: {
    Map
  },
  data() {
    return {
      idsString: '',
      from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10),
      to: new Date().toISOString().slice(0, 10),
      points: [
        { "LAT": 56.678, "LONG": 12.862, "NITRATE": 3 },
        { "LAT": 56.677, "LONG": 12.861, "NITRATE": 4 },
        { "LAT": 56.676, "LONG": 12.861, "NITRATE": 3 },
        { "LAT": 56.675, "LONG": 12.860, "NITRATE": 2 },
        { "LAT": 56.674, "LONG": 12.860, "NITRATE": 1 }
      ]
    }
  },
  mounted() {
    setInterval(this.fetchData, 5000)
  },
  methods: {
    fetchData() {
      if (!this.from || !this.to || !this.idsString) return
      console.log("plop")
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
