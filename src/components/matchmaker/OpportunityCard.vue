<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ConsultantWithFlags } from '../../composables/useGlobalFilter'
import type { Opportunity } from '../../types'

const props = defineProps<{
  opportunity: Opportunity
  consultantsById: Record<string, ConsultantWithFlags>
}>()

const panel = ref<string[]>([])

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
})

const topMatches = computed(() => [...props.opportunity.matches].sort((a, b) => b.fitScore - a.fitScore))

function fitTone(score: number): 'success' | 'warning' | 'error' {
  if (score >= 90) return 'success'
  if (score >= 78) return 'warning'
  return 'error'
}
</script>

<template>
  <VCard rounded="lg" class="opportunity-card">
    <VCardTitle class="card-title-row">
      <div>
        <div class="role-title">{{ opportunity.roleTitle }}</div>
        <div class="subtitle">{{ opportunity.client }} • Starts {{ dateFormatter.format(new Date(opportunity.startDate)) }}</div>
      </div>
      <VChip color="primary" variant="flat" size="small">{{ topMatches.length }} matches</VChip>
    </VCardTitle>

    <VCardText>
      <div class="skill-line">
        <span>Required:</span>
        <VChip
          v-for="skill in opportunity.requiredSkills"
          :key="skill"
          size="x-small"
          color="error"
          variant="tonal"
        >
          {{ skill }}
        </VChip>
      </div>
      <div class="skill-line">
        <span>Preferred:</span>
        <VChip
          v-for="skill in opportunity.preferredSkills"
          :key="skill"
          size="x-small"
          color="warning"
          variant="tonal"
        >
          {{ skill }}
        </VChip>
      </div>

      <div class="match-row" v-for="match in topMatches" :key="match.consultantId">
        <VChip color="primary" variant="outlined" size="small">
          {{ consultantsById[match.consultantId]?.name ?? 'Unknown Consultant' }}
        </VChip>
        <VChip :color="fitTone(match.fitScore)" size="small" variant="flat" class="fit-chip">
          Fit {{ match.fitScore }}
        </VChip>

        <VExpansionPanels v-model="panel" variant="accordion" class="reasons-panel">
          <VExpansionPanel :value="match.consultantId" rounded="lg">
            <VExpansionPanelTitle>Why this match</VExpansionPanelTitle>
            <VExpansionPanelText>
              <VList density="compact" class="reasons-list">
                <VListItem v-for="reason in match.reasons" :key="reason" :title="reason" />
              </VList>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped>
.opportunity-card {
  background: rgba(22, 33, 62, 0.88);
  border: 1px solid rgba(234, 234, 234, 0.08);
}

.card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 8px;
}

.role-title {
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
}

.subtitle {
  opacity: 0.7;
  font-size: 0.78rem;
}

.skill-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.skill-line span {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  opacity: 0.8;
}

.match-row {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 8px;
  align-items: start;
  margin-top: 10px;
}

.fit-chip {
  font-weight: 700;
}

.reasons-panel {
  background: transparent;
}

.reasons-list {
  background: transparent;
  padding: 0;
}

@media (max-width: 960px) {
  .match-row {
    grid-template-columns: 1fr;
  }
}
</style>
