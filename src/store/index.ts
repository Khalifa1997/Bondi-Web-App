import Vue from "vue";
import VuexPersistence from "vuex-persist";
import Vuex, { StoreOptions } from "vuex";

import deviceModule from "@/store/device";
import loginModule from "@/store/login";
import orderModule from "@/store/order";

export enum Modules {
  DEVICE = "DEVICE",
  ORDERS = "ORDERS",
  LOGIN = "LOGIN"
}
type storeState = {
  state: undefined;
  actions: undefined;
  getters: undefined;
  mutations: undefined;
  modules: {
    [Modules.DEVICE]: typeof deviceModule;
    [Modules.LOGIN]: typeof loginModule;
    [Modules.ORDERS]: typeof orderModule;
  };
};

Vue.use(Vuex);
const vuexLocal = new VuexPersistence<storeState>({
  storage: window.sessionStorage,
  modules: [Modules.LOGIN, Modules.DEVICE]
});
// only allow modules Scope
const root: StoreOptions<storeState> = {
  state: undefined,
  actions: undefined,
  getters: undefined,
  mutations: undefined,
  modules: {
    [Modules.DEVICE]: deviceModule,
    [Modules.LOGIN]: loginModule,
    [Modules.ORDERS]: orderModule
  },
  plugins: [vuexLocal.plugin]
};

export type rootState = storeState;

export default new Vuex.Store(root);
