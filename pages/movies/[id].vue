<script setup>
    const config = useRuntimeConfig();
    const route = useRoute();
    const { data, error } = await useFetch(`https://www.omdbapi.com/?i=${route.params.id}&apikey=${config.public.omdbKey}`, {
        pick: ["Plot", "Title", "Poster", "Error"],
        key: `/movies/${route.params.id}`,
    });

    if (data.value.Error == "Incorrect IMDb ID.") {
            showError({ statusCode: 404, statusMessage: "Page Not Found!"})
        }
    if (error.value)
    {
        showError({ statusCode: 500, statusMessage: "Oh noes!"})
    }

    useHead(
        {
            title: data.value.Title,
            meta: [
                { name: "description", content: data.value.Plot},
                { property: "og:description", content: data.value.Plot},
                { property: "og:image", content: data.value.Poster},
                { name: "twitter:card", content: `summary_large_image`}
            ]
        }
    )
</script>
<template>
    <div>
        <pre>{{data}}</pre>
    </div>
</template>