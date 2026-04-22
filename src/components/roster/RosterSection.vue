<script setup lang="ts">
import { ref } from 'vue'
import type { ConsultantWithFlags } from '../../composables/useGlobalFilter'
import RosterKPIBar from './RosterKPIBar.vue'
import RosterTable from './RosterTable.vue'

defineProps<{
  consultants: ConsultantWithFlags[]
}>()

const expandedRows = ref<string[]>([])
</script>

<template>
  <section id="roster" class="section-block">
    <header class="section-header">
      <h2>ROSTER & AVAILABILITY</h2>
      <p>Current deployment, roll-off risk, and upcoming PTO for every consultant.</p>
    </header>

    <RosterKPIBar :consultants="consultants" />

    <RosterTable v-model:expanded="expandedRows" :consultants="consultants" />
  </section>
</template>

<style scoped>
.section-block {
  display: grid;
  gap: 14px;
}
</style>
