<script setup lang="ts">
const query = defineModel<string>('query', { required: true })
const skill = defineModel<string | null>('skill', { required: true })

defineProps<{
  skills: string[]
}>()
</script>

<template>
  <div class="filter-grid">
    <VTextField
      v-model="query"
      density="compact"
      variant="outlined"
      color="primary"
      prepend-inner-icon="mdi-magnify"
      hide-details
      clearable
      label="Filter by consultant or client"
    />
    <VSelect
      v-model="skill"
      :items="skills"
      density="compact"
      variant="outlined"
      color="primary"
      hide-details
      clearable
      label="Skill tag"
    />
  </div>
</template>

<style scoped>
.filter-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 10px;
}

@media (max-width: 960px) {
  .filter-grid {
    grid-template-columns: 1fr;
  }
}
</style>
