import {getKongService, setKongService} from 'modules/kong/apis/client';
import {KongConfig, updateConfig, updateInformation, updateStatus} from './kong';
import {KongInformation, KongServiceEntity} from 'modules/kong/apis/types';
import axios from 'axios'
import {KongClientService} from 'modules/kong/apis/KongClientService';

export function doUpdateInformation() {
  return async (dispatch, getState) => {
    dispatch(updateInformation(await getKongService().getInformation()))
  }
}

export function doUpdateStatus() {
  return async (dispatch, getState) => {
    dispatch(updateStatus(await getKongService().getNodeStatus()))
  }
}

export function doSetupConfig(config: KongConfig) {
  return async (dispatch) => {
    const {baseURL, headers} = config;
    config = {baseURL, headers};

    const data: KongInformation = (await axios.get(baseURL, {headers})).data;
    console.info(`kong config ${baseURL} v${data.version}`);
    setKongService(new KongClientService({client: axios.create(config)}));
    dispatch(updateConfig(config))
  }
}


export function doAddService() {
  return async (dispatch, getState) => {

  }
}

export function doViewService(opts: { id, service?: KongServiceEntity }) {
  return async (dispatch, getState) => {

  }
}