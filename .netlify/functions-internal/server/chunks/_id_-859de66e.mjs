import { b as useRoute, s as showError, d as useHead, e as useRuntimeConfig, u as useNuxtApp, c as createError, a as useRequestFetch } from './server.mjs';
import { withAsyncContext, unref, useSSRContext, computed, reactive, ref, getCurrentInstance, onServerPrefetch } from 'vue';
import { hash } from 'ohash';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
import 'ufo';
import 'defu';
import './netlify.mjs';
import 'node-fetch-native/polyfill';
import 'radix3';
import 'destr';
import 'scule';
import 'unenv/runtime/fetch/index';
import 'unstorage';

const getDefault = () => null;
function useAsyncData(...args) {
  var _a2, _b, _c, _d, _e, _f;
  var _a;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  options.lazy = (_c = options.lazy) != null ? _c : false;
  options.immediate = (_d = options.immediate) != null ? _d : true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref((_f = (_e = getCachedData()) != null ? _e : (_a = options.default) == null ? void 0 : _a.call(options)) != null ? _f : null),
      pending: ref(!hasCachedData()),
      error: ref(nuxt.payload._errors[key] ? createError(nuxt.payload._errors[key]) : null)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a3;
      var _a22;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref((_a3 = (_a22 = options.default) == null ? void 0 : _a22.call(options)) != null ? _a3 : null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || hash([autoKey, unref(opts.baseURL), typeof request === "string" ? request : "", unref(opts.params || opts.query)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    watch: [
      _fetchOptions,
      _request,
      ...watch || []
    ]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const isLocalFetch = typeof _request.value === "string" && _request.value.startsWith("/");
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch && isLocalFetch) {
      _$fetch = useRequestFetch();
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = /* @__PURE__ */ useRuntimeConfig();
    const route = useRoute();
    const { data, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`https://www.omdbapi.com/?i=${route.params.id}&apikey=${config.omdbKey}`, {
      pick: ["Plot", "Title", "Poster", "Error"],
      key: `/movies/${route.params.id}`
    }, "$RMfb8nUpTS")), __temp = await __temp, __restore(), __temp);
    if (data.value.Error == "Incorrect IMDb ID.") {
      showError({ statusCode: 404, statusMessage: "Page Not Found!" });
    }
    if (error.value) {
      showError({ statusCode: 500, statusMessage: "Oh noes!" });
    }
    useHead(
      {
        title: data.value.Title,
        meta: [
          { name: "description", content: data.value.Plot },
          { property: "og:description", content: data.value.Plot },
          { property: "og:image", content: data.value.Poster },
          { name: "twitter:card", content: `summary_large_image` }
        ]
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><pre>${ssrInterpolate(unref(data))}</pre></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/movies/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-859de66e.mjs.map
