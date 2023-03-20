export default defineEventHandler(async (event) => {

    const { query } = getQuery(event);

    const Search: Promise<any> = await $fetch<Promise<any>>(`https://www.omdbapi.com/?apikey=bac43bed&s=${query}`)

    return Search;
  })
  