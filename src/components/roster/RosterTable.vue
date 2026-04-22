<script setup lang="ts">
import { computed } from 'vue'
import type { ConsultantWithFlags } from '../../composables/useGlobalFilter'

const props = defineProps<{
  consultants: ConsultantWithFlags[]
}>()

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Client', key: 'client' },
  { title: 'Project End', key: 'projectEndDate' },
  { title: 'Rolling Off Soon', key: 'rollingSoonDerived' },
  { title: 'PTO Upcoming', key: 'pto' },
  { title: 'Utilization %', key: 'utilization' },
]

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
})

const expanded = defineModel<string[]>('expanded', { default: [] })

const tableItems = computed(() =>
  props.consultants.map((consultant) => ({
    ...consultant,
    ptoCount: consultant.pto.length,
  })),
)

function formatDate(input: string): string {
  return dateFormatter.format(new Date(input))
}
</script>

<template>
  <VDataTable
    v-model:expanded="expanded"
    :headers="headers"
    :items="tableItems"
    density="compact"
    item-value="id"
    expand-on-click
    show-expand
    class="roster-table"
  >
    <template #item.name="{ item }">
      <div class="name-cell">
        <strong>{{ item.name }}</strong>
        <div class="title-row">{{ item.title }}</div>
      </div>
    </template>

    <template #item.projectEndDate="{ item }">
      {{ formatDate(item.projectEndDate) }}
    </template>

    <template #item.rollingSoonDerived="{ item }">
      <VChip
        :color="item.rollingSoonDerived ? 'warning' : 'success'"
        size="small"
        variant="flat"
        label
      >
        {{ item.rollingSoonDerived ? 'Rolling Off Soon' : 'Stable' }}
      </VChip>
    </template>

    <template #item.pto="{ item }">
      <VChip
        :color="item.ptoCount > 0 ? 'error' : 'success'"
        size="small"
        variant="outlined"
        label
      >
        {{ item.ptoCount > 0 ? `${item.ptoCount} upcoming` : 'None' }}
      </VChip>
    </template>

    <template #item.utilization="{ item }">
      <VTooltip location="top">
        <template #activator="{ props: tooltipProps }">
          <VProgressLinear
            v-bind="tooltipProps"
            :model-value="item.utilization.actual"
            :color="item.utilization.actual >= item.utilization.target ? 'success' : 'warning'"
            rounded
            height="16"
          >
            <template #default>
              <strong class="bar-label">{{ item.utilization.actual }}%</strong>
            </template>
          </VProgressLinear>
        </template>
        <span>Target {{ item.utilization.target }}% • Actual {{ item.utilization.actual }}%</span>
      </VTooltip>
    </template>

    <template #expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <div class="expanded-grid">
            <div>
              <h4>Skills</h4>
              <VChip
                v-for="skill in item.skills"
                :key="skill"
                color="primary"
                variant="tonal"
                size="small"
                class="mr-2 mb-2"
              >
                {{ skill }}
              </VChip>
            </div>
            <div>
              <h4>Bio</h4>
              <p>{{ item.bio }}</p>
            </div>
            <div>
              <h4>Upcoming PTO</h4>
              <VList density="compact" class="transparent-list">
                <VListItem v-for="entry in item.pto" :key="`${entry.start}-${entry.end}`">
                  <VListItemTitle>{{ formatDate(entry.start) }} - {{ formatDate(entry.end) }}</VListItemTitle>
                  <VListItemSubtitle>{{ entry.note }}</VListItemSubtitle>
                </VListItem>
                <VListItem v-if="item.pto.length === 0">
                  <VListItemTitle>No upcoming PTO</VListItemTitle>
                </VListItem>
              </VList>
            </div>
          </div>
        </td>
      </tr>
    </template>
  </VDataTable>
</template>

<style scoped>
.roster-table {
  background: rgba(22, 33, 62, 0.65);
  border: 1px solid rgba(234, 234, 234, 0.08);
  border-radius: 14px;
}

.name-cell {
  display: grid;
}

.title-row {
  font-size: 0.75rem;
  opacity: 0.7;
}

.bar-label {
  font-size: 0.72rem;
}

.expanded-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 14px;
  padding: 12px 0;
}

.expanded-grid h4 {
  margin: 0 0 8px;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
}

.expanded-grid p {
  margin: 0;
  font-size: 0.88rem;
}

.transparent-list {
  background: transparent;
  padding: 0;
}
</style>
