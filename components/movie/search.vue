<script lang="ts" setup>
  const config = useRuntimeConfig();
  const query = ref("batman");
  const movies: any = ref([]);
  async function search() {
    const { Search}: any = await $fetch(`/api/omdb/?query=${query.value}`)
    movies.value = Search;
  }
  search();
</script>

<template>
    <div>
        <form @submit.prevent="search">
        <input type="text" v-model="query">
        <button>Search</button>
        </form>
        <ul style="display: flex; flex-wrap: wrap; gap: 10px; list-style: none;">
            <li v-for="movie in movies" :key="movie.imdbID">
                <NuxtLink :to="{name: 'movies-id', params: {id: movie.imdbID}}">
                <img :src="movie.Poster" :alt="movie.title" />
                </NuxtLink>
            </li>
        </ul>
    </div>  
</template>