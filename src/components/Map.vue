<template>
  <div id="mapview" />
  <div class="scale">
    <div>{{ `${minmax[0]} ${unit}` }}</div>
    <div>{{ `${minmax[1]} ${unit}` }}</div>
  </div>
  {{ metric }} map
</template>

<script>
import L from 'leaflet'

export default {
  name: 'Map',
  props: {
    points: {
      type: Array,
      required: true
    },
    metric: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minmax: []
    }
  },
  mounted() {
    this.createPoints(
      this.createMap(this.points[0].LAT, this.points[0].LONG, this.metric),
      this.points,
      this.metric
    )
  },
  methods: {
    createMap(lat, long) {
      var map = L.map('mapview').setView([lat, long], 15)

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map)
      return map
    },
    createPoints(map, points, metric) {
      if (!points.length) return

      this.minmax = points.reduce(
        (acc, point) => [Math.min(acc[0], point[metric] ?? Infinity), Math.max(acc[1], point[metric] ?? -Infinity)],
        [points[0][metric], points[0][metric]]
      )
      for (const point of points) {
        if ('LAT' in point && 'LONG' in point && metric in point) {
          L.circle([point.LAT, point.LONG], {
            color: `hsl(${((point[metric] - this.minmax[0]) * 100) / (this.minmax[1] - this.minmax[0])}, 100%, 50%)`,
          }).addTo(map)
        }
      }
    }
  }
}
</script>

<style scoped>
#mapview {
  height: 500px;
}

.scale {
  width: 100%;
  height: 25px;
  background: linear-gradient(to right, hsl(0, 100%, 50%), hsl(100, 100%, 50%));
  display: flex;
  justify-content: space-between;
}
</style>