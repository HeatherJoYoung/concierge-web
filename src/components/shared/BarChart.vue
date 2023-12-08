<template>
  <Bar
    id="chartId"
    :data="chartData"
    class="bar-chart"
  />
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String
    },
    chartData: {
      type: Object,
      required: true
    }
  },
}
</script>
  
<style lang="scss">
.bar-chart {
  height: auto;
  width: 100%;
}
</style>
    