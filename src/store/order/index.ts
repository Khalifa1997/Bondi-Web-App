import actions from "@/store/order/actions";
import state, { orderStateType } from "@/store/order/state";
import mutations from "@/store/order/mutations";
import getters from "@/store/order/getters";
import { Module } from "vuex";
import { rootState } from "..";

type OrderModuleTree = Module<orderStateType, rootState>;
const orderModule: OrderModuleTree = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default orderModule;
