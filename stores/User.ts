export const useUserStore = defineStore("User", {
    state: () => ({
       
        isLoggedIn: false
      
    }),
    getters: {},
    actions: {
        login() {
            this.isLoggedIn = true;
            useRouter().push("/");
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
