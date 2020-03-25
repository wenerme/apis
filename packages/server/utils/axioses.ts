import { AxiosResponse } from 'axios';
import { isDev } from '@wener/utils/src/envs/isDev';

export async function resultOf<T = any>(r: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const res = await r;
    return res.data;
  } catch (e) {
    const res = e.response?.data;
    if (isDev()) {
      console.error(`Error Response`, res, e);
    }
    if (!res) {
      throw e;
    }
    throw res;
  }
}
