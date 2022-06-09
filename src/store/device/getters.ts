import {
  Idevice,
  IdevicePagination,
  deviceStateType,
  deviceFilterStateType,
  IdeviceModel,
  IdeviceInterface,
  IdeviceSite
} from "@/store/device/state";
import { GetterTree } from "vuex";
import { rootState } from "..";

export enum DeviceGetters {
  GET_ALL_DEVICES = "GET_ALL_DEVICES",
  GET_MODELS = "GET_MODELS",
  GET_INTERFACES = "GET_INTERFACES",
  GET_SELECTED_INTERFACE = "GET_SELECTED_INTERFACE",
  GET_SELECTED_DEVICE = "GET_SELECTED_DEVICE",
  GET_ALL_SITES = "GET_ALL_SITES",
  GET_SET_OF_DEVICES = "GET_SET_OF_DEVICES",
  GET_PAGINATION = "GET_PAGINATION",
  GET_DEVICE_FILTER_ITEMS = "GET_DEVICE_FILTER_ITEMS",
  GET_LOADING = "GET_LOADING",
  GET_ERRORS = "GET_ERRORS"
}
type DeviceGetterTree = GetterTree<deviceStateType, rootState>;

const getters: DeviceGetterTree = {
  [DeviceGetters.GET_PAGINATION]: (
    state: deviceStateType
  ): IdevicePagination => {
    if (!state.pagenation) {
      return { pageno: 1, maxRecordsPerPage: 10 };
    }
    return state.pagenation;
  },
  [DeviceGetters.GET_LOADING]: (state: deviceStateType) => {
    return state.loading;
  },
  // return a sub set of orders for tables based on pagination
  [DeviceGetters.GET_SET_OF_DEVICES]: (
    state: deviceStateType
  ): { data: Idevice[]; total: number } => {
    const filtered = state.items.filter((v: Idevice) => {
      const s: string[] = Object.keys(state.filters);

      return !s.some((k: string) => {
        if (!state.filters[k] || !state.filters[k].length) {
          return false;
        }
        if (!state.filters[k].includes(eval(`v.${k}`))) {
          return true;
        } else {
          return false;
        }
      });
    });

    if (
      !state.pagenation ||
      (filtered.length && filtered.length < state.pagenation.maxRecordsPerPage)
    ) {
      return { data: filtered, total: filtered.length };
    }

    const start = state.pagenation.pageno * state.pagenation.maxRecordsPerPage;
    const end = start + state.pagenation.maxRecordsPerPage;

    //  return data according to the pagination

    // const sliced = filtered.slice(start, end); //uncomment this if you want to use pagination
    const sliced = filtered.slice(0, end); // scrolling

    return { data: sliced, total: filtered.length };
  },
  [DeviceGetters.GET_ALL_DEVICES]: (
    state: deviceStateType
    // ordrGetters: any,
    // rootState: any
  ) => {
    return state.items;
  },
  [DeviceGetters.GET_SELECTED_DEVICE]: (
    state: deviceStateType
    // ordrGetters: any,
    // rootState: any
  ) => {
    return state.selectedItem;
  },
  [DeviceGetters.GET_DEVICE_FILTER_ITEMS]: (
    state: deviceStateType
  ): deviceFilterStateType => {
    return state.filters;
  },
  [DeviceGetters.GET_MODELS]: (state: deviceStateType): IdeviceModel[] => {
    return state.models;
  },
  [DeviceGetters.GET_SELECTED_INTERFACE]: (
    state: deviceStateType
  ): IdeviceInterface => {
    return state.selectedInterface;
  },
  [DeviceGetters.GET_INTERFACES]: (
    state: deviceStateType
  ): IdeviceInterface[] => {
    return state.interfaces;
  },
  [DeviceGetters.GET_ALL_SITES]: (state: deviceStateType): IdeviceSite[] => {
    return state.sites;
  },
  [DeviceGetters.GET_ERRORS]: (state: deviceStateType) => {
    return [];
  }
};

export type orderGetters = typeof getters;

export default getters;
