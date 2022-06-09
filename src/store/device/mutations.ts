import {
  Idevice,
  deviceStateType,
  IdevicePagination,
  IdeviceModel,
  IdeviceSite,
  IdeviceInterface,
  IdeviceInterfacePayload
} from "@/store/device/state";
import { MutationTree } from "vuex";

export enum DeviceMutations {
  ADD_DEVICE = "ADD_DEVICE",
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
  SET_DEVICE_STATUS = "SET_DEVICE_STATUS",
  SET_DEVICES_FROM_API = "SET_DEVICES_FROM_API",
  SET_PAGINATION = "SET_PAGINATION",
  SET_FILTERS = "SET_FILTERS",
  SET_SELECTED_DEVICE = "SET_SELECTED_DEVICE",
  SET_INTERFACES = "SET_INTERFACES",
  SET_SELECTED_INTERFACE = "SET_SELECTED_INTERFACE",
  SET_MODELS = "SET_MODELS",
  SET_SITES = "SET_SITES",
  SET_CONFIGURATION = "SET_CONFIGURATION",
  SET_LOADING = "SET_LOADING",

  RESET_ERROR_MESSAGES = "RESET_ERROR_MESSAGES"
}

type DeviceMutationTree = MutationTree<deviceStateType>;

const mutations: DeviceMutationTree = {
  [DeviceMutations.ADD_DEVICE]: (state: deviceStateType, payload: Idevice) => {
    state.items.push({ ...payload });
  },
  [DeviceMutations.RESET_ERROR_MESSAGES]: (
    state: deviceStateType,
    payload: undefined
  ) => {
    state.errors = [];
  },
  [DeviceMutations.SET_ERROR_MESSAGE]: (
    state: deviceStateType,
    payload: unknown
  ) => {
    state.errors.push(payload as any);
  },
  [DeviceMutations.SET_DEVICES_FROM_API]: (
    state: deviceStateType,
    payload: Idevice[]
  ) => {
    state.items = payload;
  },
  [DeviceMutations.SET_PAGINATION]: (
    state: deviceStateType,
    payload: IdevicePagination
  ) => {
    state.pagenation = { ...payload };
  },
  [DeviceMutations.SET_SELECTED_INTERFACE]: (
    state: deviceStateType,
    payload: IdeviceInterface
  ) => {
    state.selectedInterface = payload;
  },
  [DeviceMutations.SET_FILTERS]: (
    state: deviceStateType,
    payload: { value: string; field: string }
  ) => {
    // there is no such filter so add it
    if (!state.filters[payload.field]) {
      state.filters = { ...state.filters, [payload.field]: [payload.value] };
      return;
    }

    // there is afilter but has nothing so add on its filter values
    // there is a filter and has a values but the value isnt in list so add it also
    if (
      !state.filters[payload.field].length ||
      !state.filters[payload.field].includes(payload.value)
    ) {
      state.filters[payload.field] = [
        ...state.filters[payload.field],
        payload.value
      ];
      return;
    }

    // none of the cases aboce so its in values so toggle it by removing the value

    const index = state.filters[payload.field].findIndex(
      (v: unknown) => v === payload.value
    );

    state.filters[payload.field] = ([] as unknown[]).concat(
      state.filters[payload.field].slice(0, index),
      state.filters[payload.field].slice(
        index + 1,
        state.filters[payload.field].length
      )
    );
  },
  [DeviceMutations.SET_SELECTED_DEVICE]: (
    state: deviceStateType,
    payload: Idevice
  ) => {
    state.selectedItem = payload;
  },
  [DeviceMutations.SET_MODELS]: (
    state: deviceStateType,
    payload: IdeviceModel[]
  ) => {
    state.models = payload;
  },
  [DeviceMutations.SET_SITES]: (
    state: deviceStateType,
    payload: IdeviceSite[]
  ) => {
    state.sites = [...payload];
  },
  [DeviceMutations.SET_DEVICE_STATUS]: (
    state: deviceStateType,
    payload: IdeviceInterface
  ) => {
    const resInterface = state.interfaces.find(val => val.id === payload.id);
    if (!resInterface) {
      return;
    }
    resInterface.enabled = payload.enabled;
    if (resInterface.id == state.selectedInterface.id) {
      state.selectedInterface.enabled = payload.enabled;
    }
  },
  [DeviceMutations.SET_INTERFACES]: (
    state: deviceStateType,
    payload: IdeviceInterface[]
  ) => {
    state.interfaces = [...payload];
  },
  [DeviceMutations.SET_LOADING]: (state: deviceStateType, payload: boolean) => {
    state.loading = payload;
  }
};

export default mutations;
