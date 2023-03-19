import { g as defineStore, h as useRouter } from './server.mjs';

const useUserStore = defineStore("User", {
  state: () => ({
    isLoggedIn: false
  }),
  getters: {},
  actions: {
    login() {
      this.isLoggedIn = true;
      useRouter().push("/");
    }
  }
});

export { useUserStore as u };
//# sourceMappingURL=User-b3adeef7.mjs.map
