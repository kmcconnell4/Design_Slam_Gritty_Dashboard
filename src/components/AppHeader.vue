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
        <VIcon icon="mdi-hockey-puck" color="primary" size="28" />
        <div class="brand-block">
          <h1 class="brand-title">{{ title }}</h1>
          <span class="brand-sub">PEOPLE LEADER VIEW</span>
        </div>
      </div>
      <div class="filter-slot">
        <slot />
      </div>
      <VChip color="primary" variant="flat" class="market-chip" prepend-icon="mdi-map-marker">{{ market }}</VChip>
    </div>
  </VAppBar>
</template>

<style scoped>
.app-header {
  border-bottom: 1px solid rgba(244, 123, 32, 0.25);
  background: linear-gradient(90deg, rgba(244, 123, 32, 0.07) 0%, transparent 40%) !important;
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
  gap: 12px;
}

.brand-block {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-title {
  margin: 0;
  font-family: 'Roboto Condensed', 'Roboto', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.14em;
  font-weight: 800;
  color: #eaeaea;
}

.brand-sub {
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  font-weight: 600;
  color: #F47B20;
  opacity: 0.85;
}

.filter-slot {
  min-width: 260px;
}

.market-chip {
  font-weight: 700;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
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
