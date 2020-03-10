import {kongService} from 'modules/kong/apis/client';
import {updateInformation, updateStatus} from './kong';
import {KongServiceEntity} from 'modules/kong/apis/types';

export function doUpdateInformation() {
  return async (dispatch, getState) => {
    dispatch(updateInformation(await kongService.getInformation()))
  }
}

export function doUpdateStatus() {
  return async (dispatch, getState) => {
    dispatch(updateStatus(await kongService.getNodeStatus()))
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
