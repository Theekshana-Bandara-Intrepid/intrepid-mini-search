<script setup lang="ts">
import type { TripRecord } from "~/types/trip";

const algoliaClient = useAlgoliaRef();

useHead({
  title: "Intrepid Mini Search",
  meta: [
    {
      name: "description",
      content: "Minimal Algolia InstantSearch learning demo.",
    },
  ],
});
</script>

<template>
  <main class="page">
    <h1>Algolia Mini Search</h1>

    <p class="subtitle">Search trips and filter by destination.</p>

    <ClientOnly>
      <ais-instant-search
        index-name="trips"
        :search-client="algoliaClient"
      >
        <ais-configure :clickAnalytics="true" />

        <ais-search-box placeholder="Search trips" />

        <section class="filters">
          <h2>Filters</h2>

          <div class="filter-item">
            <p>Destination</p>
            <ais-refinement-list attribute="destination" />
          </div>

          <div class="filter-item">
            <p>Travel Style</p>
            <ais-refinement-list attribute="travelStyle" />
          </div>

          <div class="filter-item">
            <p>Guaranteed Only</p>
            <ais-toggle-refinement
              attribute="isGuaranteed"
              label="Show guaranteed departures"
              :on="true"
            />
          </div>

          <ais-clear-refinements />
        </section>

        <ais-stats />

        <ais-hits>
          <template #item="{ item }">
            <TripCard :trip="item as TripRecord" />
          </template>
        </ais-hits>

        <ais-pagination />
      </ais-instant-search>

      <template #fallback>
        <p>Loading search...</p>
      </template>
    </ClientOnly>
  </main>
</template>

<style scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
  font-family: Arial, sans-serif;
}

h1 {
  margin: 0;
}

.subtitle {
  margin: 0.5rem 0 1.5rem;
  color: #555;
}

.filters {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #fff;
}

.filters h2 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
}

.filter-item {
  margin-bottom: 0.75rem;
}

.filter-item p {
  margin: 0 0 0.35rem;
  font-weight: 600;
}

:deep(.ais-SearchBox) {
  margin-bottom: 1rem;
}

:deep(.ais-RefinementList) {
  margin-bottom: 0;
}

:deep(.ais-Stats) {
  margin-bottom: 1rem;
  color: #444;
}

:deep(.ais-Pagination) {
  margin-top: 1rem;
}

:deep(.ais-Pagination-list) {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
}

:deep(.ais-Pagination-item) {
  margin: 0;
}

:deep(.ais-Pagination-link) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.6rem;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  color: #222;
  background: #fff;
  text-decoration: none;
  font-size: 0.9rem;
}

:deep(.ais-Pagination-item--selected .ais-Pagination-link) {
  background: #1f6feb;
  border-color: #1f6feb;
  color: #fff;
}

:deep(.ais-Pagination-item--disabled .ais-Pagination-link) {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>

