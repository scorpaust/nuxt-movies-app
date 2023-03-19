export default defineEventHandler(async (event) => {

    const Search: Promise<any> = await $fetch<Promise<any>>(`https://www.omdbapi.com/?i=tt3896198&apikey=bac43bed&s=batman`)

    return {
      Search
    }
  })
  