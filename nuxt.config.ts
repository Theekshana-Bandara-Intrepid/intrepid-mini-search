// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Add the Algolia module
  modules: [
    [
      "@nuxtjs/algolia",
      {
        apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
        applicationId: process.env.ALGOLIA_APPLICATION_ID,
        // This enables the vue-instantsearch components globally
        instantSearch: {
          theme: "algolia", // Loads Algolia's default CSS theme
        },
      },
    ],
  ],

  // Performance: preconnect to Algolia's servers
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: `https://${process.env.ALGOLIA_APPLICATION_ID}-dsn.algolia.net`,
          crossorigin: "",
        },
      ],
    },
  },
});
