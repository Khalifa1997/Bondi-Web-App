import { axios, filterQurery } from "./config";
import {
  Idevice,
  IdeviceModel,
  IdeviceInterface,
  IdeviceConfiguration,
  IdeviceInterfacePayload,
  IdeviceProvisionPayload,
  IdeviceSite
} from "@/store/device/state";

const deviceApi = {
  async getDevices(
    deviceModelId?: number,
    siteId?: number,
    search?: string
  ): Promise<Idevice[]> {
    const qurery = filterQurery([
      ["deviceModelId", deviceModelId],
      ["siteId", siteId],
      ["search", search]
    ]);

    const mockData: Idevice[] = [
      {
        id: 0,
        hostname: "Host 1",
        model: {
          id: 0,
          name: "Cisco",
          displayName: "Cisco",
          vendor: "Cisco"
        },
        status: "Planned",
        site: {
          id: 0,
          name: "Site A"
        },
        role: "string",
        managementIpAddress: "127.2.2.101/12",

        order: {
          deviceSite: "Site A",
          completed: true,
          shipped: true,
          deliveryDate: new Date().toString(),
          createdAt: new Date().toString(),
          shipDate: new Date().toString(),
          delivered: true,
          id: 20,
          deviceHostname: "Host 1",
          status: "Planned",
          shipTrackingUrl: ""
        },
        configurationAvailable: true,
        healthInfoUrl: "string"
      },
      {
        id: 0,
        hostname: "Host 2",
        model: {
          id: 0,
          name: "Fortinet",
          displayName: "Fortinet",
          vendor: "Fortinet"
        },
        status: "Active",
        site: {
          id: 0,
          name: "Site A"
        },
        role: "string",
        managementIpAddress: "127.2.2.101/12",

        order: {
          deviceSite: "Site A",
          completed: true,
          shipped: true,
          deliveryDate: new Date().toString(),
          createdAt: new Date().toString(),
          shipDate: new Date().toString(),
          delivered: true,
          id: 20,
          deviceHostname: "Host 2",
          status: "Active",
          shipTrackingUrl: ""
        },
        configurationAvailable: true,
        healthInfoUrl: "string"
      },
      {
        id: 4,
        hostname: "Host 2",
        model: {
          id: 0,
          name: "Fortinet",
          displayName: "Fortinet",
          vendor: "Fortinet"
        },
        status: "Active",
        site: {
          id: 0,
          name: "Site A"
        },
        role: "string",
        managementIpAddress: "127.2.2.101/12",

        order: {
          deviceSite: "Site A",
          completed: true,
          shipped: true,
          deliveryDate: new Date().toString(),
          createdAt: new Date().toString(),
          shipDate: new Date().toString(),
          delivered: true,
          id: 20,
          deviceHostname: "Host 2",
          status: "Active",
          shipTrackingUrl: ""
        },
        configurationAvailable: true,
        healthInfoUrl: "string"
      }
    ];

    return mockData;
  },
  async getModels(): Promise<IdeviceModel[]> {
    const mockData = [
      {
        id: 0,
        name: "Cisco",
        displayName: "Cisco",
        vendor: "Cisco"
      },
      {
        id: 7,
        name: "Cisco",
        displayName: "Cisco",
        vendor: "Cisco"
      },

      {
        id: 1,
        name: "Fortinet D900",
        displayName: "Fortinet D900",
        vendor: "Fortinet"
      },
      {
        id: 2,
        name: "Juniper vSRX",
        displayName: "Juniper vSRX",
        vendor: "Juniper"
      },
      {
        id: 3,
        name: "Juniper vSRX",
        displayName: "Juniper vSRX",
        vendor: "Juniper"
      },
      {
        id: 4,
        name: "Juniper vSRX",
        displayName: "Juniper vSRX",
        vendor: "Juniper"
      },
      {
        id: 5,
        name: "Juniper vSRX",
        displayName: "Juniper vSRX",
        vendor: "Juniper"
      }
    ];

    return mockData;
  },
  async getSites(): Promise<IdeviceSite[]> {
    const mockData: IdeviceSite[] = [
      {
        id: 0,
        name: "England"
      }
    ];

    return mockData;
  },
  async getDeviceInterfaces(deviceId: number): Promise<IdeviceInterface[]> {
    return [
      {
        id: 0,
        name: "Device A",
        description: "description",
        enabled: true,
        ipAddress: "127.201.21.2"
      }
    ];
  },
  async getDeviceConfiguration(
    deviceId: number
  ): Promise<IdeviceConfiguration> {
    return "string";
  },
  async getDevice(deviceId: number): Promise<Idevice> {
    return {
      id: 0,
      hostname: "Host 1",
      model: {
        id: 0,
        name: "Cisco",
        displayName: "Cisco",
        vendor: "Cisco"
      },
      status: "Active",
      site: {
        id: 0,
        name: "Site A"
      },
      role: "string",
      managementIpAddress: "127.2.2.101/12",

      order: {
        deviceSite: "Site A",
        completed: true,
        shipped: true,
        deliveryDate: new Date().toString(),
        createdAt: new Date().toString(),
        shipDate: new Date().toString(),
        delivered: true,
        id: 20,
        deviceHostname: "Host 1",
        status: "Active",
        shipTrackingUrl: ""
      },
      configurationAvailable: true,
      healthInfoUrl: "string"
    };
  },
  async deleteDevice(deviceId: number): Promise<boolean> {
    //const response = await axios.delete(`/api/management/devices/${deviceId}`);

    return true;
  },
  async getDeviceInterface(
    deviceId: number,
    interfaceId: number
  ): Promise<IdeviceInterface> {
    return {
      id: 0,
      name: "Device A",
      description: "description",
      enabled: true,
      ipAddress: "127.210.2.2/21"
    };
  },
  async addDeviceInterfaceStatus(
    deviceId: number,
    interfaceId: number,
    enabled: boolean
  ): Promise<IdeviceInterface> {
    return {
      id: 0,
      name: "Interface Name",
      description: "description",
      enabled: true,
      ipAddress: "127.21.21.20/20"
    };
  },
  // requires payload
  async addDeviceInterfaceDescription(
    deviceId: number,
    interfaceId: number,
    payload: IdeviceInterfacePayload
  ): Promise<IdeviceInterface> {
    return {
      description: payload.description!,
      id: deviceId,
      enabled: true,
      name: "New Name",
      ipAddress: payload.ipAddressV4!
    };
  },

  async addDeviceInterfaceStage(
    deviceId: number,
    payload: IdeviceProvisionPayload
  ): Promise<void> {
    return;
  },
  async UpdateDevice(deviceId: number, payload: Idevice): Promise<Idevice> {
    return {
      id: 0,
      hostname: "Host 1",
      model: {
        id: 0,
        name: "Cisco",
        displayName: "Cisco",
        vendor: "Cisco"
      },
      status: "Failed",
      site: {
        id: 0,
        name: "Site A"
      },
      role: "string",
      managementIpAddress: "127.2.2.101/12",

      order: {
        deviceSite: "Site A",
        completed: true,
        shipped: true,
        deliveryDate: new Date().toString(),
        createdAt: new Date().toString(),
        shipDate: new Date().toString(),
        delivered: true,
        id: 20,
        deviceHostname: "Host 1",
        status: "Failed",
        shipTrackingUrl: ""
      },
      configurationAvailable: true,
      healthInfoUrl: "string"
    };
  }
};

export default deviceApi;
