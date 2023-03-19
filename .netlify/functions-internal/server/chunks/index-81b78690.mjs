import { _ as __nuxt_component_0 } from './nuxt-link-e2ed10c2.mjs';
import { e as useRuntimeConfig } from './server.mjs';
import { useSSRContext, defineComponent, ref, unref, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
import 'defu';
import './netlify.mjs';
import 'node-fetch-native/polyfill';
import 'radix3';
import 'destr';
import 'scule';
import 'unenv/runtime/fetch/index';
import 'ohash';
import 'unstorage';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    const config = /* @__PURE__ */ useRuntimeConfig();
    const query = ref("batman");
    const movies = ref([]);
    async function search() {
      const { Search } = await $fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${config.omdbKey}&s=${query.value}`);
      movies.value = Search;
    }
    search();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><form><input type="text"${ssrRenderAttr("value", unref(query))}><button>Search</button></form><ul style="${ssrRenderStyle({ "display": "flex", "flex-wrap": "wrap", "gap": "10px", "list-style": "none" })}"><!--[-->`);
      ssrRenderList(unref(movies), (movie) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: { name: "movies-id", params: { id: movie.imdbID } }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", movie.Poster)}${ssrRenderAttr("alt", movie.title)}${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: movie.Poster,
                  alt: movie.title
                }, null, 8, ["src", "alt"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/movie/search.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_MovieSearch = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_MovieSearch, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/movies/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-81b78690.mjs.map
