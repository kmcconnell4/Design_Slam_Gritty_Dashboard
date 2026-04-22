<script setup lang="ts">
import { computed } from 'vue'
import type { ConsultantWithFlags } from '../../composables/useGlobalFilter'

type KpiTone = 'primary' | 'success' | 'warning' | 'error'

const props = defineProps<{
  consultants: ConsultantWithFlags[]
}>()

const today = new Date()

const withUpcomingPto = computed(() =>
  props.consultants.filter((consultant) =>
    consultant.pto.some((entry) => new Date(entry.end) >= today),
  ).length,
)

const fullyStaffed = computed(
  () => props.consultants.filter((consultant) => consultant.utilization.actual >= consultant.utilization.target)
    .length,
)

const kpis = computed(() => {
  const items: Array<{ label: string; value: number; tone: KpiTone; icon: string }> = [
    {
      label: 'TOTAL HEADCOUNT',
      value: props.consultants.length,
      tone: 'primary',
      icon: 'mdi-account-group',
    },
    {
      label: 'AVAILABLE SOON',
      value: props.consultants.filter((consultant) => consultant.rollingSoonDerived).length,
      tone: 'warning',
      icon: 'mdi-calendar-clock',
    },
    {
      label: 'ON PTO',
      value: withUpcomingPto.value,
      tone: 'error',
      icon: 'mdi-palm-tree',
    },
    {
      label: 'FULLY STAFFED',
      value: fullyStaffed.value,
      tone: 'success',
      icon: 'mdi-check-circle',
    },
  ]

  return items
})
</script>

<template>
  <VSheet class="kpi-wrap" rounded="lg">
    <VChip
      v-for="kpi in kpis"
      :key="kpi.label"
      :color="kpi.tone"
      variant="flat"
      class="kpi-chip"
      label
    >
      <VIcon :icon="kpi.icon" size="16" start />
      <span class="kpi-label">{{ kpi.label }}</span>
      <strong class="kpi-value">{{ kpi.value }}</strong>
    </VChip>
  </VSheet>
</template>

<style scoped>
.kpi-wrap {
  padding: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  background: rgba(244, 123, 32, 0.08);
}

.kpi-chip {
  font-weight: 700;
}

.kpi-label {
  margin-right: 6px;
  font-size: 0.74rem;
  letter-spacing: 0.08em;
}

.kpi-value {
  font-size: 1rem;
}
</style>
