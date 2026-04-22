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
  revenueSold: number
  revenueTarget: number
  managedRevenue: number
  managedRevenueTarget: number
}>()

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: ['Revenue Sold', 'Managed Revenue'],
  datasets: [
    {
      label: 'Actual',
      data: [props.revenueSold, props.managedRevenue],
      backgroundColor: '#F47B20',
      borderRadius: 4,
    },
    {
      label: 'Target',
      data: [props.revenueTarget, props.managedRevenueTarget],
      backgroundColor: '#FFC107',
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
          return `${context.dataset.label}: ${currencyFormatter.format(Number(context.raw))}`
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
      ticks: {
        color: '#EAEAEA',
        callback(value) {
          return currencyFormatter.format(Number(value))
        },
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
    <VCardTitle>REVENUE SOLD</VCardTitle>
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
