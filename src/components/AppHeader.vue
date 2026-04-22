<script setup lang="ts">
defineProps<{
  title: string
  market: string
}>()
</script>

<template>
  <VAppBar color="surface" flat height="76" class="app-header">
    <div class="header-shell">
      <div class="brand-wrap">
        <VIcon icon="mdi-hockey-puck" color="primary" size="20" />
        <h1 class="brand-title">{{ title }}</h1>
      </div>
      <div class="filter-slot">
        <slot />
      </div>
      <VChip color="primary" variant="outlined" class="market-chip">{{ market }}</VChip>
    </div>
  </VAppBar>
</template>

<style scoped>
.app-header {
  border-bottom: 1px solid rgba(234, 234, 234, 0.15);
}

.header-shell {
  width: min(1320px, calc(100vw - 32px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-title {
  margin: 0;
  font-size: 1rem;
  letter-spacing: 0.08em;
  font-weight: 800;
  color: rgb(var(--v-theme-on-surface));
}

.filter-slot {
  min-width: 260px;
}

.market-chip {
  font-weight: 700;
  letter-spacing: 0.06em;
}

@media (max-width: 960px) {
  .header-shell {
    grid-template-columns: 1fr;
    padding-block: 8px;
    gap: 8px;
  }

  .filter-slot {
    min-width: 100%;
  }
}
</style>
