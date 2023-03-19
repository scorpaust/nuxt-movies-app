export default defineEventHandler(async (event) => {

    const search = await readBody(event)
    const config = useRuntimeConfig();

    const { data } = await $fetch<any>(`https://www.omdbapi.com/?i=tt3896198&apikey=${config.omdbKey}&s=${search}`)

    return data
  })
  