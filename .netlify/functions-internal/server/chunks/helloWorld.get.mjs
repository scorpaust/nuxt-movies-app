import { defineEventHandler, getQuery } from 'h3';

const helloWorld_get = defineEventHandler((event) => {
  return {
    message: getQuery(event)
  };
});

export { helloWorld_get as default };
//# sourceMappingURL=helloWorld.get.mjs.map
