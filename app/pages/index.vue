<script setup lang="ts">
import type { TripRecord } from "~/types/trip";

const algoliaClient = useAlgoliaRef();

const PRIMARY_INDEX = "trips";
const sortOptions = [
  { label: "Best Match (Relevance)", value: PRIMARY_INDEX },
  { label: "Price: Cheapest First", value: "trips_price_asc" },
  { label: "Price: Most Expensive First", value: "trips_price_desc" },
];

const currentIndexName = ref(PRIMARY_INDEX);

useHead({
  title: "Intrepid Mini Search — Find Your Next Adventure",
  meta: [
    {
      name: "description",
      content:
        "Search and filter travel trips to Sri Lanka and beyond. Powered by Algolia.",
    },
  ],
});
</script>

<template>
  <div class="search-page">
    <header class="search-header">
      <h1>Find Your Next Adventure</h1>
      <p>Search thousands of departures instantly</p>
    </header>

    <main class="search-layout">
      <ais-instant-search
        :index-name="currentIndexName"
        :search-client="algoliaClient"
        :insights="true"
      >
        <div class="search-controls">
          <ais-search-box
            placeholder="Search trips, destinations..."
            class="search-box"
          />

          <div class="sort-control">
            <label for="sort-select">Sort by:</label>
            <select
              id="sort-select"
              v-model="currentIndexName"
              class="sort-select"
            >
              <option
                v-for="option in sortOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="content-area">
          <aside class="filters-panel">
            <h2 class="filters-title">Filter Results</h2>

            <div class="filter-group">
              <h3>Destination</h3>
              <ais-refinement-list attribute="destination" />
            </div>

            <div class="filter-group">
              <h3>Travel Style</h3>
              <ais-refinement-list attribute="travelStyle" />
            </div>

            <div class="filter-group">
              <h3>Guaranteed Departures Only</h3>

              <ais-toggle-refinement
                attribute="isGuaranteed"
                label="Show guaranteed departures only"
                :on="true"
              />
            </div>

            <ais-clear-refinements class="clear-filters-btn">
              <template #resetLabel> ✖ Clear All Filters </template>
            </ais-clear-refinements>
          </aside>

          <div class="results-panel">
            <ais-stats class="results-stats" />

            <ais-hits>
              <template #item="{ item }">
                <TripCard :trip="item as TripRecord" />
              </template>
            </ais-hits>

            <ais-pagination class="pagination" />
          </div>
        </div>
      </ais-instant-search>
    </main>
  </div>
</template>

<style scoped>
.search-page {
  min-height: 100vh;
  background: #f0f4f8;
  font-family: "Inter", sans-serif;
}

.search-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;
  padding: 48px 32px;
  text-align: center;
}

.search-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 8px 0;
}

.search-header p {
  font-size: 1.1rem;
  opacity: 0.8;
  margin: 0;
}

.search-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}

.search-controls {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 280px;
}

.sort-control {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
}

.sort-select {
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  font-size: 0.95rem;
  cursor: pointer;
  outline: none;
}

.sort-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.content-area {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.filters-panel {
  width: 240px;
  flex-shrink: 0;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.filters-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #111827;
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group h3 {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 8px 0;
}

.clear-filters-btn {
  width: 100%;
  margin-top: 8px;
}

.results-panel {
  flex: 1;
  min-width: 0;
}

.results-stats {
  margin-bottom: 12px;
  font-size: 0.9rem;
  color: #6b7280;
}

.pagination {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}
</style>
