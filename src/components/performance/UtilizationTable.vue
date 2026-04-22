<script setup lang="ts">
import { computed } from 'vue'
import type { ConsultantWithFlags } from '../../composables/useGlobalFilter'

const props = defineProps<{
  consultants: ConsultantWithFlags[]
}>()

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Actual %', key: 'actual' },
  { title: 'Target %', key: 'target' },
  { title: 'Delta', key: 'delta' },
  { title: 'Bar', key: 'bar' },
]

const rows = computed(() =>
  props.consultants.map((consultant) => {
    const actual = consultant.utilization.actual
    const target = consultant.utilization.target
    return {
      id: consultant.id,
      name: consultant.name,
      actual,
      target,
      delta: actual - target,
    }
  }),
)
</script>

<template>
  <VDataTable :headers="headers" :items="rows" density="compact" class="utilization-table">
    <template #item.actual="{ item }">
      <VChip :color="item.actual >= item.target ? 'success' : 'warning'" variant="flat" size="small">
        {{ item.actual }}%
      </VChip>
    </template>

    <template #item.target="{ item }"> {{ item.target }}% </template>

    <template #item.delta="{ item }">
      <strong :class="item.delta >= 0 ? 'positive' : 'negative'">
        {{ item.delta >= 0 ? '+' : '' }}{{ item.delta }} pts
      </strong>
    </template>

    <template #item.bar="{ item }">
      <VTooltip location="top">
        <template #activator="{ props: tooltipProps }">
          <VProgressLinear
            v-bind="tooltipProps"
            :model-value="item.actual"
            :color="item.actual >= item.target ? 'success' : 'warning'"
            rounded
            height="16"
          />
        </template>
        <span>Actual {{ item.actual }}% / Target {{ item.target }}%</span>
      </VTooltip>
    </template>
  </VDataTable>
</template>

<style scoped>
.utilization-table {
  background: rgba(22, 33, 62, 0.65);
  border: 1px solid rgba(234, 234, 234, 0.08);
  border-radius: 14px;
}

.positive {
  color: #4caf50;
}

.negative {
  color: #ff6b6b;
}
</style>
