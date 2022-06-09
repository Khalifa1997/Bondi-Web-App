import actions from "@/store/device/actions";
import state, { deviceStateType } from "@/store/device/state";
import mutations from "@/store/device/mutations";
import getters from "@/store/device/getters";
import { Module } from "vuex";
import { rootState } from "..";

type DeviceModuleTree = Module<deviceStateType, rootState>;
const deviceModule: DeviceModuleTree = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default deviceModule;
