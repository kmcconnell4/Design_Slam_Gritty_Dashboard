<script setup lang="ts">
import type { ConsultantWithFlags } from '../../composables/useGlobalFilter'
import type { Opportunity } from '../../types'
import OpportunityCard from './OpportunityCard.vue'

defineProps<{
  opportunities: Opportunity[]
  consultantsById: Record<string, ConsultantWithFlags>
}>()
</script>

<template>
  <section id="matchmaker" class="section-block">
    <header class="section-header">
      <h2>ROLE MATCHMAKER</h2>
      <p>Open opportunities with fit-scored candidate matches and rationale.</p>
    </header>

    <div class="card-grid">
      <OpportunityCard
        v-for="opportunity in opportunities"
        :key="opportunity.id"
        :opportunity="opportunity"
        :consultants-by-id="consultantsById"
      />
    </div>
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

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 12px;
}
</style>
