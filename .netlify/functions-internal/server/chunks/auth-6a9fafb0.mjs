import { f as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import 'vue';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
import 'ufo';
import 'vue/server-renderer';
import 'defu';
import './netlify.mjs';
import 'node-fetch-native/polyfill';
import 'radix3';
import 'destr';
import 'scule';
import 'unenv/runtime/fetch/index';
import 'ohash';
import 'unstorage';

const auth = /* @__PURE__ */ defineNuxtRouteMiddleware((to, from) => {
  {
    return navigateTo("/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-6a9fafb0.mjs.map
