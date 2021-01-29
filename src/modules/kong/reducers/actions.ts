import { getKongService, setKongService } from '../apis/client';
import { KongConfig, updateConfig, updateInformation, updateStatus } from './kong';
import { KongInformation } from '../apis/types';
import axios from 'axios';
import { KongClientService } from '../apis/KongClientService';

export function doUpdateInformation() {
  return async (dispatch, getState) => {
    dispatch(updateInformation(await getKongService().getInformation()));
  };
}

export function doUpdateStatus() {
  return async (dispatch, getState) => {
    dispatch(updateStatus(await getKongService().getNodeStatus()));
  };
}

export function doSetupConfig(config: KongConfig) {
  return async (dispatch) => {
    const { baseURL, headers } = config;
    config = { baseURL, headers };

    const data: KongInformation = (await axios.get(baseURL, { headers })).data;
    console.info(`kong config ${baseURL} v${data.version}`);
    setKongService(new KongClientService({ client: axios.create(config) }));
    dispatch(updateConfig(config));
  };
}
