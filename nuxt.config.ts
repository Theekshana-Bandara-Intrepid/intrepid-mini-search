// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    [
      "@nuxtjs/algolia",
      {
        apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
        applicationId: process.env.ALGOLIA_APPLICATION_ID,
      },
    ],
  ],

  runtimeConfig: {
    public: {
      algoliaApplicationId: process.env.ALGOLIA_APPLICATION_ID,
      algoliaApiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    },
  },
});
