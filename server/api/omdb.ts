export default defineEventHandler(async (event): Promise<any> => {

    const config = useRuntimeConfig();

    const { data } = await $fetch<any>(`https://www.omdbapi.com/?i=tt3896198&apikey=${config.public.omdbKey}&s=batman`, {
      method: 'get'
    })

    return data
  })
  