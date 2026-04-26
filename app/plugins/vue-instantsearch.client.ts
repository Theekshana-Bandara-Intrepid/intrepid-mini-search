// app/plugins/vue-instantsearch.client.ts
// Registers vue-instantsearch components globally on the client.
// The @nuxtjs/algolia module only provides the search client,
// it does NOT register ais-* components.
import InstantSearch from "vue-instantsearch/vue3/es";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(InstantSearch);
});
