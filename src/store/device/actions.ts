import router from "@/router";
import deviceApi from "@/api/device";
import { ActionContext, ActionTree } from "vuex";
import state, {
  Idevice,
  IdevicePagination,
  deviceStateType,
  IdeviceInterface,
  IdeviceInterfacePayload
} from "./state";
import { DeviceMutations } from "./mutations";
import { rootState } from "@/store";
import { ROUTES } from "@/router/routes";

export enum DeviceActions {
  GET_ALL = "GET_DEVICES",
  GET_MODELS = "GET_MODELS",
  GET_INTERFACES = "GET_INTERFACES",
  GET_CONFIGURATION = "GET_CONFIGURATION",
  GET_DEVICE = "GET_DEVICE",
  GET_INTERFACE = "GET_INTERFACE",
  GET_SITES = "GET_SITES",

  ADD_DEVICE = "ADD_DEVICE",
  ADD_DEVICE_STATUS = "ADD_DEVICE_STATUS",

  ADD_DEVICE_INTERFACE_DESCRIPTION = "ADD_DEVICE_INTERFACE_DESCRIPTION",
  SET_DEVICE_INTERFACE_DESCRIPTION = "SET_DEVICE_INTERFACE_DESCRIPTION",

  UPDATE = "UPDATE_DEVICE",
  DELETE = "DELETE_DEVICE_BY_ID",
  SET_PAGINATION = "SET_PAGINATION",
  SET_FILTERS = "SET_DEVICE_FILTERS",

  RESET_ERRORS = "RESET_ERRORS",

  ATTACH = "ATTACH_DEVICES"
}

type DeviceActionTree = ActionTree<deviceStateType, rootState>;
type DeviceAction = ActionContext<deviceStateType, rootState>;

const actions: DeviceActionTree = {
  [DeviceActions.ATTACH]: (action: DeviceAction, payload: undefined) => {
    action.commit(DeviceMutations.SET_PAGINATION, {
      ...action.state.pagenation,
      pageno: action.state.pagenation.pageno + 1
    });
  },
  [DeviceActions.RESET_ERRORS]: (action: DeviceAction, payload: undefined) => {
    action.commit(DeviceMutations.RESET_ERROR_MESSAGES, payload);
  },
  [DeviceActions.GET_ALL]: (
    action: DeviceAction,
    payload: { deviceModelId?: number; siteId?: number; search?: string } = {}
  ) => {
    action.commit(DeviceMutations.SET_LOADING, true);
    deviceApi
      .getDevices(payload.deviceModelId, payload.siteId, payload.search)
      .then(res => {
        action.commit(DeviceMutations.SET_DEVICES_FROM_API, res);
        action.commit(DeviceMutations.SET_LOADING, false);
        action.commit(DeviceMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(DeviceMutations.SET_ERROR_MESSAGE, rej);
        action.commit(DeviceMutations.SET_LOADING, false);
      });
    // action.commit(OrderMutations.SET_ORDER_FROM_API, payload);
  },
  [DeviceActions.ADD_DEVICE_STATUS]: (
    action: DeviceAction,
    payload: { deviceId: number; interfaceId: number; enabled: boolean }
  ) => {
    action.commit(DeviceMutations.SET_LOADING, true);
    deviceApi
      .addDeviceInterfaceStatus(
        payload.deviceId,
        payload.interfaceId,
        payload.enabled
      )
      .then(res => {
        action.commit(DeviceMutations.SET_DEVICE_STATUS, res);
        action.commit(DeviceMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(DeviceMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(DeviceMutations.SET_LOADING, false);
      });
  },
  [DeviceActions.SET_DEVICE_INTERFACE_DESCRIPTION]: (
    action: DeviceAction,
    payload: { interfaceId: number }
  ) => {
    const newSelectedInterface = action.state.interfaces.find(
      val => val.id === payload.interfaceId
    );

    action.commit(DeviceMutations.SET_SELECTED_INTERFACE, newSelectedInterface);
  },
  [DeviceActions.ADD_DEVICE_INTERFACE_DESCRIPTION]: (
    action: DeviceAction,
    payload: {
      deviceId: number;
      interfaceId: number;
      data: IdeviceInterfacePayload;
    }
  ) => {
    action.commit(`${DeviceMutations.SET_LOADING}`, true);
    deviceApi
      .addDeviceInterfaceDescription(
        payload.deviceId,
        payload.interfaceId,
        payload.data
      )
      .then(res => {
        action.commit(`${DeviceMutations.SET_SELECTED_INTERFACE}`, res);
        action.commit(DeviceMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(
          `${DeviceMutations.SET_SELECTED_INTERFACE}`,
          action.state.selectedInterface
        );
        action.commit(DeviceMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(DeviceMutations.SET_LOADING, false);
      });
  },
  [DeviceActions.GET_DEVICE]: (
    action: DeviceAction,
    payload: { deviceId: number }
  ) => {
    action.commit(DeviceMutations.SET_LOADING, true);
    deviceApi
      .getDevice(payload.deviceId)
      .then(res => {
        action.commit(DeviceMutations.SET_SELECTED_DEVICE, res);
        action.commit(DeviceMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(DeviceMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(DeviceMutations.SET_LOADING, false);
      });
    // action.commit(OrderMutations.SET_ORDER_FROM_API, payload);
  },
  [DeviceActions.ADD_DEVICE]: (action: DeviceAction, payload: Idevice) => {
    // deviceApi.addOrder(payload).then(response => {
    //   if (response.status === 200) {
    //     action.commit(OrderMutations.ADD_ORDER, payload);
    //     action.commit(OrderMutations.SET_ERROR_MESSAGE, "");
    //   } else {
    //     action.commit(OrderMutations.SET_ERROR_MESSAGE, response.message);
    //   }
    // });
  },
  [DeviceActions.SET_PAGINATION]: (
    action: DeviceAction,
    payload: IdevicePagination
  ) => {
    action.commit(DeviceMutations.SET_PAGINATION, payload);
  },
  [DeviceActions.SET_FILTERS]: (
    action: DeviceAction,
    payload: { value: string; field: string }
  ) => {
    action.commit(DeviceMutations.SET_FILTERS, payload);
  },
  [DeviceActions.GET_INTERFACES]: (
    action: DeviceAction,
    payload: { deviceId: number }
  ) => {
    action.commit(DeviceMutations.SET_LOADING, true);
    deviceApi
      .getDeviceInterfaces(payload.deviceId)
      .then(res => {
        action.commit(DeviceMutations.SET_INTERFACES, res);
        action.commit(DeviceMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(DeviceMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(DeviceMutations.SET_LOADING, false);
      });
  },
  [DeviceActions.GET_INTERFACE]: (
    action: DeviceAction,
    payload: { deviceId: number; interfaceId: number }
  ) => {
    action.commit(DeviceMutations.SET_LOADING, true);
    deviceApi
      .getDeviceInterface(payload.deviceId, payload.interfaceId)
      .then(res => {
        action.commit(DeviceMutations.SET_SELECTED_INTERFACE, res);
        action.commit(DeviceMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(DeviceMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(DeviceMutations.SET_LOADING, false);
      });
  },
  [DeviceActions.GET_MODELS]: (action: DeviceAction, payload: undefined) => {
    action.commit(DeviceMutations.SET_LOADING, true);
    deviceApi
      .getModels()
      .then(res => {
        action.commit(DeviceMutations.SET_MODELS, res);
        action.commit(DeviceMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(DeviceMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(DeviceMutations.SET_LOADING, false);
      });
  },
  [DeviceActions.GET_CONFIGURATION]: (
    action: DeviceAction,
    payload: { deviceId: number }
  ) => {
    action.commit(DeviceMutations.SET_LOADING, true);
    deviceApi
      .getDeviceConfiguration(payload.deviceId)
      .then(res => {
        action.commit(DeviceMutations.SET_CONFIGURATION, res);
        action.commit(DeviceMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(DeviceMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(DeviceMutations.SET_LOADING, false);
      });
  },
  [DeviceActions.GET_SITES]: (action: DeviceAction, payload: undefined) => {
    action.commit(DeviceMutations.SET_LOADING, true);
    deviceApi
      .getSites()
      .then(res => {
        action.commit(DeviceMutations.SET_SITES, res);
        action.commit(DeviceMutations.RESET_ERROR_MESSAGES);
      })
      .catch(rej => {
        action.commit(DeviceMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(DeviceMutations.SET_LOADING, false);
      });
  },
  [DeviceActions.DELETE]: (
    action: DeviceAction,
    payload: { deviceId: number }
  ) => {
    action.commit(DeviceMutations.SET_LOADING, true);
    deviceApi
      .deleteDevice(payload.deviceId)
      .then(res => {
        if (res) {
          action.commit(DeviceMutations.RESET_ERROR_MESSAGES);
          router.push(ROUTES.DEVICES);
        } else {
          action.commit(DeviceMutations.SET_ERROR_MESSAGE, "Error");
        }
      })
      .catch(rej => {
        action.commit(DeviceMutations.SET_ERROR_MESSAGE, rej);
      })
      .finally(() => {
        action.commit(DeviceMutations.SET_LOADING, false);
      });
  }
};

export default actions;
