<script setup lang="ts">
import { computed } from 'vue'
import type { ConsultantWithFlags } from '../../composables/useGlobalFilter'
import type { PerformanceSnapshot } from '../../types'
import RevenueChart from './RevenueChart.vue'
import UtilizationChart from './UtilizationChart.vue'
import UtilizationTable from './UtilizationTable.vue'

const props = defineProps<{
  consultants: ConsultantWithFlags[]
  performance: PerformanceSnapshot
}>()

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const utilizationDelta = computed(
  () => props.performance.teamUtilizationActual - props.performance.teamUtilizationTarget,
)
</script>

<template>
  <section id="performance" class="section-block">
    <header class="section-header">
      <h2>PERFORMANCE METRICS</h2>
      <p>Team outcomes versus plan with individual utilization signal.</p>
    </header>

    <div class="kpi-grid">
      <UtilizationChart
        :actual="performance.teamUtilizationActual"
        :target="performance.teamUtilizationTarget"
      />
      <RevenueChart
        :revenue-sold="performance.revenueSold"
        :revenue-target="performance.revenueTarget"
        :managed-revenue="performance.managedRevenue"
        :managed-revenue-target="performance.managedRevenueTarget"
      />
      <VCard class="summary-card" rounded="lg">
        <VCardTitle>MANAGED REV. SUMMARY</VCardTitle>
        <VCardText>
          <div class="summary-value">{{ currencyFormatter.format(performance.managedRevenue) }}</div>
          <VChip
            :color="utilizationDelta >= 0 ? 'success' : 'warning'"
            variant="flat"
            size="small"
          >
            Utilization {{ utilizationDelta >= 0 ? '+' : '' }}{{ utilizationDelta }} pts vs target
          </VChip>
          <div class="summary-meta">
            Target: {{ currencyFormatter.format(performance.managedRevenueTarget) }}
          </div>
        </VCardText>
      </VCard>
    </div>

    <UtilizationTable :consultants="consultants" />
  </section>
</template>

<style scoped>
.section-block {
  display: grid;
  gap: 14px;
}

.section-header h2 {
  margin: 0;
  font-size: 0.94rem;
  letter-spacing: 0.11em;
  font-weight: 800;
}

.section-header p {
  margin: 4px 0 0;
  opacity: 0.75;
  font-size: 0.86rem;
}

.kpi-grid {
  display: grid;
  grid-template-columns: 1.2fr 1.4fr minmax(220px, 1fr);
  gap: 12px;
}

.summary-card {
  background: rgba(22, 33, 62, 0.9);
}

.summary-value {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.summary-meta {
  margin-top: 12px;
  opacity: 0.76;
  font-size: 0.86rem;
}

@media (max-width: 1150px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
