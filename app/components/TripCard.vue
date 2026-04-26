<script setup lang="ts">
import type { TripRecord } from "~/types/trip";

import aa from "search-insights";

const props = defineProps<{
  trip: TripRecord;
}>();

const formattedDate = computed(() => {
  return new Date(props.trip.departureDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const formattedPrice = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(props.trip.price_usd);
});

const seatsLabel = computed(() => {
  if (props.trip.seatsAvailable <= 3)
    return "Only " + props.trip.seatsAvailable + " seats left!";
  return props.trip.seatsAvailable + " seats available";
});

const seatsUrgent = computed(() => props.trip.seatsAvailable <= 3);

function sendClickEvent() {
  if (!props.trip.__queryID) {
    console.warn(
      'No __queryID on hit — make sure :insights="true" is set on AisInstantSearch',
    );
    return;
  }

  aa("clickedObjectIDsAfterSearch", {
    eventName: "Trip Card Clicked",
    index: "trips",
    queryID: props.trip.__queryID,
    objectIDs: [props.trip.objectID],
    positions: [props.trip.__position ?? 1],
  });

  console.log(
    `[Algolia Event] ✅ Click event sent for: ${props.trip.productName} (objectID: ${props.trip.objectID})`,
  );
}

function sendConversionEvent() {
  if (!props.trip.__queryID) return;

  aa("convertedObjectIDsAfterSearch", {
    eventName: "Trip Booked",
    index: "trips",
    queryID: props.trip.__queryID,
    objectIDs: [props.trip.objectID],
  });

  console.log(
    `[Algolia Event] 🎉 Conversion event sent for: ${props.trip.productName}`,
  );
}
</script>

<template>
  <article class="trip-card">
    <div class="trip-badges">
      <span class="badge style-badge">{{ trip.travelStyle }}</span>
      <span v-if="trip.isGuaranteed" class="badge guaranteed-badge"
        >✓ Guaranteed</span
      >
    </div>

    <h2 class="trip-name">
      <ais-highlight attribute="productName" :hit="trip" />
    </h2>

    <p class="trip-destination">📍 {{ trip.destination }}</p>

    <div class="trip-details">
      <div class="detail-item">
        <span class="detail-label">Departure</span>
        <span class="detail-value">{{ formattedDate }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Duration</span>
        <span class="detail-value">{{ trip.durationDays }} days</span>
      </div>
    </div>

    <p class="seats-label" :class="{ urgent: seatsUrgent }">
      🪑 {{ seatsLabel }}
    </p>

    <div class="trip-footer">
      <div class="price-block">
        <span class="price-label">From</span>
        <span class="price-value">{{ formattedPrice }}</span>
        <span class="price-currency">USD</span>
      </div>

      <div class="action-buttons">
        <button class="btn btn-secondary" @click="sendClickEvent">
          View Trip
        </button>

        <button class="btn btn-primary" @click="sendConversionEvent">
          Book Now
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.trip-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.trip-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.trip-badges {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
}

.style-badge {
  background: #eff6ff;
  color: #1d4ed8;
}

.guaranteed-badge {
  background: #f0fdf4;
  color: #15803d;
}

.trip-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px 0;
}

.trip-destination {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0 0 16px 0;
}

.trip-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
}

.seats-label {
  font-size: 0.88rem;
  color: #6b7280;
  margin: 0 0 16px 0;
}

.seats-label.urgent {
  color: #dc2626;
  font-weight: 600;
}

.trip-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
}

.price-block {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.price-label {
  font-size: 0.8rem;
  color: #9ca3af;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f3460;
}

.price-currency {
  font-size: 0.8rem;
  color: #9ca3af;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-primary {
  background: linear-gradient(135deg, #0f3460, #533483);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: scale(1.02);
}
</style>
