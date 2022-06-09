/* eslint-disable */

import Vue from "vue";
import App from "@/app/App.vue";
import router from "./router";
import store from "@/store";
import "@/styles/main.css";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Vue.config.productionTip = false;

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    Vue,
    dsn:
      "https://c3249a836eeb4d55a6825324311910b3@o492909.ingest.sentry.io/5698944",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
  });
}
new Vue({
  router,
  store,
  render: (h: (arg0: any) => any) => h(App)
}).$mount("#app");
