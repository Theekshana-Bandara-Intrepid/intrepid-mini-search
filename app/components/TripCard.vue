<script setup lang="ts">
import type { TripRecord } from "~/types/trip";
import aa from "search-insights";

const props = defineProps<{
  trip: TripRecord;
}>();

const formattedPrice = computed(() => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(props.trip.price_usd);
});

const TRACKING_INDEX = "trips";

function trackClick() {
  if (!props.trip.__queryID) {
    console.warn("[Tracking] click skipped: missing __queryID", {
      objectID: props.trip.objectID,
      name: props.trip.productName,
    });
    return;
  }

  console.log("[Tracking] click event", {
    objectID: props.trip.objectID,
    queryID: props.trip.__queryID,
    position: props.trip.__position ?? 1,
  });

  aa("clickedObjectIDsAfterSearch", {
    eventName: "Trip Clicked",
    index: TRACKING_INDEX,
    queryID: props.trip.__queryID,
    objectIDs: [props.trip.objectID],
    positions: [props.trip.__position ?? 1],
  });
}

function trackBooking() {
  if (!props.trip.__queryID) {
    console.warn("[Tracking] booking skipped: missing __queryID", {
      objectID: props.trip.objectID,
      name: props.trip.productName,
    });
    return;
  }

  console.log("[Tracking] booking event", {
    objectID: props.trip.objectID,
    queryID: props.trip.__queryID,
  });

  aa("convertedObjectIDsAfterSearch", {
    eventName: "Trip Booked",
    index: TRACKING_INDEX,
    queryID: props.trip.__queryID,
    objectIDs: [props.trip.objectID],
  });
}
</script>

<template>
  <article class="trip-card">
    <h2>
      <ais-highlight attribute="productName" :hit="trip" />
    </h2>

    <p><strong>Destination:</strong> {{ trip.destination }}</p>
    <p><strong>Price:</strong> {{ formattedPrice }}</p>

    <div class="actions">
      <button type="button" @click.stop="trackClick">View</button>
      <button type="button" @click.stop="trackBooking">Book</button>
    </div>
  </article>
</template>

<style scoped>
.trip-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  background: #fff;
}

h2 {
  margin: 0 0 0.5rem;
}

p {
  margin: 0.25rem 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

button {
  border: 1px solid #ccc;
  background: #f8f8f8;
  border-radius: 6px;
  padding: 0.35rem 0.6rem;
  cursor: pointer;
}
</style>
