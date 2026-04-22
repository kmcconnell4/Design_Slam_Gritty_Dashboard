<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartData,
  type ChartOptions,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const props = defineProps<{
  actual: number
  target: number
}>()

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: ['Team Utilization'],
  datasets: [
    {
      label: 'Actual %',
      data: [props.actual],
      backgroundColor: '#F47B20',
      borderRadius: 4,
    },
    {
      label: 'Target %',
      data: [props.target],
      backgroundColor: '#4CAF50',
      borderRadius: 4,
    },
  ],
}))

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#EAEAEA',
      },
    },
    tooltip: {
      callbacks: {
        label(context) {
          return `${context.dataset.label}: ${context.raw}%`
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#EAEAEA',
      },
      grid: {
        color: 'rgba(234, 234, 234, 0.1)',
      },
    },
    y: {
      suggestedMax: 100,
      ticks: {
        color: '#EAEAEA',
      },
      grid: {
        color: 'rgba(234, 234, 234, 0.1)',
      },
    },
  },
}
</script>

<template>
  <VCard class="metric-card" rounded="lg">
    <VCardTitle>TEAM UTIL.</VCardTitle>
    <VCardText class="chart-wrap">
      <Bar :data="chartData" :options="chartOptions" />
    </VCardText>
  </VCard>
</template>

<style scoped>
.metric-card {
  background: rgba(22, 33, 62, 0.9);
}

.chart-wrap {
  height: 220px;
}
</style>
