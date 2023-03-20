export default defineEventHandler(async (event) => {

    const { query } = getQuery(event);

    const config = useRuntimeConfig();

    const Search: Promise<any> = await $fetch<Promise<any>>(`https://www.omdbapi.com/?apikey=${config.omdbKey}&s=${query}`)

    return Search;
  })
  