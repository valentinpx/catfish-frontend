<template>
  {{ metric }} chart in {{ unit }}
  <div :id="metric" />
</template>

<script>
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"

export default {
  name: 'Chart',
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
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      new Chart(`#${this.metric}`, {
        data: this.getData(),
        type: 'line',
        height: 250,
        colors: ['purple']
      })
    },
    getData() {
      var labels = []
      var values = []

      this.points.forEach(point => {
        if (point[this.metric] && point["TIME"]) {
          labels.push(point["TIME"])
          values.push(point[this.metric])
        }
      })
      return { labels: labels, datasets: [{ values: values }] }
    }
  }
}
</script>