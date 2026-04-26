# Intrepid Mini Search

## Introduction

This is a small learning project for Algolia InstantSearch with Nuxt.

## Project Overview

This project helps you learn how search works in a real frontend app. Users can search trips, filter results, move between pages, and send click and booking tracking events to Algolia Insights.

## Technologies Used

- `Nuxt 4` for the application framework
- `Vue 3` for UI components
- `@nuxtjs/algolia` for Algolia integration
- `vue-instantsearch` for search widgets
- `search-insights` for event tracking
- `TypeScript` for type safety

## Architecture Process

The app has a simple flow. First, `app/pages/index.vue` creates the main search page and connects to Algolia with `ais-instant-search`. Then, search widgets (`ais-search-box`, `ais-refinement-list`, `ais-pagination`) send query settings to Algolia and receive results. Next, the results are rendered through `ais-hits`, and each result is shown by `app/components/TripCard.vue`. Finally, when the user clicks `View` or `Book`, `TripCard` sends tracking events with `search-insights`. This structure keeps search logic in the page and item-level logic in the card component.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Required Environment Variables

- `ALGOLIA_APPLICATION_ID`
- `ALGOLIA_SEARCH_API_KEY`
