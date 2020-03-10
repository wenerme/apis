import {KongService} from 'modules/kong/apis/service';
import {KongErrorResponse, KongListQuery, KongListResponse, KongTagEntity} from 'modules/kong/apis/types';
import {AxiosInstance, AxiosResponse} from 'axios';

export interface KongClientServiceInit {
  client: AxiosInstance;
}

export class KongClientService implements KongService {
  client: AxiosInstance;


  constructor(init: KongClientServiceInit) {
    this.client = init.client
  }

  getInformation = () => this.client.get('/').then(v => v.data);
  getNodeStatus = () => this.client.get('/status').then(v => v.data);

  listService = params => resultOf(this.client.get('/services', {params}));
  addService = entity => resultOf(this.client.post('/services', entity));
  updateService = entity => resultOf(this.client.post(`/services/${entity.id}`, entity));
  deleteService = idOrName => resultOf(this.client.delete(`/services/${idOrName}`));
  getServiceByIdOrName = idOrName => resultOf(this.client.get(`/services/${idOrName}`));

  listRoute = params => resultOf(this.client.get('/routes', {params}));
  addRoute = entity => resultOf(this.client.post('/routes', entity));
  updateRoute = entity => resultOf(this.client.post(`/routes/${entity.id}`, entity));
  deleteRoute = idOrName => resultOf(this.client.delete(`/routes/${idOrName}`));
  getRouteByIdOrName = idOrName => resultOf(this.client.get(`/routes/${idOrName}`));

  listTags(params?: KongListQuery): Promise<KongListResponse<KongTagEntity>> {
    return this.client.get('/tags', {params}).then(v => v.data);
  }
}

async function resultOf<T = any>(r: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const res = await r;
    return res.data
  } catch (e) {
    const res: KongErrorResponse = e.response?.data;
    console.error(`Request Error`, res);
    throw res;
  }
}
