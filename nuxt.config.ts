// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            omdbKey: process.env.NUXT_OMDB_KEY
        }  
    },
    modules: [
        ["@pinia/nuxt", {
            autoImports: ["defineStore", "acceptHMRUpdate"]
        }]
    ],
    imports: {
        dirs: ["stores"]
    },
    alias: {
        pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
    },
})
