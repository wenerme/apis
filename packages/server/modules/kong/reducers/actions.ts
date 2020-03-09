import {kongClient} from 'modules/kong/apis/client';
import {updateInformation} from './kong';

export function doUpdateInformation() {
  return async (dispatch, getState) => {
    const {data} = await kongClient.get('/');
    dispatch(updateInformation(data))
  }
}
