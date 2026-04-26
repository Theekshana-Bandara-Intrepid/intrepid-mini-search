import aa from "search-insights";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  aa("init", {
    appId: config.public.algoliaApplicationId as string,
    apiKey: config.public.algoliaApiKey as string,
    useCookie: true,
  });
});
