<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import GlobalFilter from './components/GlobalFilter.vue'
import RosterSection from './components/roster/RosterSection.vue'

const PerformanceSection = defineAsyncComponent(
  () => import('./components/performance/PerformanceSection.vue'),
)
const MatchmakerSection = defineAsyncComponent(
  () => import('./components/matchmaker/MatchmakerSection.vue'),
)
import { useGlobalFilter } from './composables/useGlobalFilter'
import consultantsData from './data/consultants.json'
import opportunitiesData from './data/opportunities.json'
import performanceData from './data/performance.json'
import type { Consultant, Opportunity, PerformanceSnapshot } from './types'

const consultants = ref(consultantsData as Consultant[])
const opportunities = ref(opportunitiesData as Opportunity[])
const performance = ref(performanceData as PerformanceSnapshot)

const filterQuery = ref('')
const selectedSkill = ref<string | null>(null)
const currentTab = ref('roster')

const { availableSkills, filteredConsultants, filteredOpportunities } = useGlobalFilter({
  consultants,
  opportunities,
  query: filterQuery,
  skill: selectedSkill,
})

const consultantsById = computed(() =>
  filteredConsultants.value.reduce<Record<string, (typeof filteredConsultants.value)[number]>>(
    (acc, consultant) => {
      acc[consultant.id] = consultant
      return acc
    },
    {},
  ),
)

const sections = [
  { label: 'Roster & Availability', value: 'roster' },
  { label: 'Performance Metrics', value: 'performance' },
  { label: 'Role Matchmaker', value: 'matchmaker' },
] as const

function scrollToSection(sectionId: string): void {
  currentTab.value = sectionId
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <VApp>
    <AppHeader title="GRITTY'S DASHBOARD" market="PA METRO">
      <GlobalFilter v-model:query="filterQuery" v-model:skill="selectedSkill" :skills="availableSkills" />
    </AppHeader>

    <VSheet class="tabs-shell" rounded="0">
      <VTabs v-model="currentTab" color="primary" density="compact" class="section-tabs" grow>
        <VTab
          v-for="section in sections"
          :key="section.value"
          :value="section.value"
          @click="scrollToSection(section.value)"
        >
          {{ section.label }}
        </VTab>
      </VTabs>
    </VSheet>

    <VMain>
      <VContainer class="page-shell">
        <RosterSection :consultants="filteredConsultants" />
        <PerformanceSection :consultants="filteredConsultants" :performance="performance" />
        <MatchmakerSection
          :opportunities="filteredOpportunities"
          :consultants-by-id="consultantsById"
        />
      </VContainer>
    </VMain>
  </VApp>
</template>
