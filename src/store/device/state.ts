import {
  DeviceDto,
  DeviceStatus,
  DeviceModelDto,
  DeviceInterfaceDto,
  DeviceProvisionDto,
  DeviceInterfaceUpdateDto,
  SiteDto
} from "@/api/models";

// normal order attr
type NA = "N/A";

export type Idevice = DeviceDto;
export type IdeviceModel = DeviceModelDto;
export type IdeviceInterface = DeviceInterfaceDto;
export type IdeviceConfiguration = string;
export type IdeviceProvisionPayload = DeviceProvisionDto;
export type IdeviceInterfacePayload = DeviceInterfaceUpdateDto;
export type IdeviceSite = SiteDto;

export interface IdevicePagination {
  pageno: number;
  maxRecordsPerPage: number;
}

export type deviceFilterStateType = {
  [key: string]: unknown[];
};

// the bigger state to be used in app
export type deviceStateType = {
  items: Idevice[];
  loading: boolean;
  selectedItem: Idevice;
  pagenation: IdevicePagination;
  filters: deviceFilterStateType;
  errors: { [key: string]: unknown }[];
  models: IdeviceModel[];
  interfaces: IdeviceInterface[];
  selectedInterface: IdeviceInterface;
  sites: IdeviceSite[];
};

// default state
const state = (): deviceStateType => ({
  items: [],
  loading: false,
  filters: {},
  pagenation: { pageno: 1, maxRecordsPerPage: 5 },
  selectedItem: {} as Idevice,
  models: [],
  sites: [],
  interfaces: [],
  selectedInterface: {} as IdeviceInterface,
  errors: []
});

export default state;
