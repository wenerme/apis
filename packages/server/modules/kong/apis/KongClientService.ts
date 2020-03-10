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
  getPluginSchema = name => resultOf(this.client.get(`/plugins/schema/${name}`));

  listService = params => resultOf(this.client.get('/services', {params}));
  addService = entity => resultOf(this.client.post('/services', entity));
  updateService = entity => resultOf(this.client.patch(`/services/${entity.id || entity.name}`, entity));
  deleteService = idOrName => resultOf(this.client.delete(`/services/${idOrName.id || idOrName}`));
  getServiceByIdOrName = idOrName => resultOf(this.client.get(`/services/${idOrName}`));

  listRoute = params => resultOf(this.client.get('/routes', {params}));
  addRoute = entity => resultOf(this.client.post('/routes', entity));
  updateRoute = entity => resultOf(this.client.patch(`/routes/${entity.id || entity.name}`, entity));
  deleteRoute = idOrName => resultOf(this.client.delete(`/routes/${idOrName.id || idOrName}`));
  getRouteByIdOrName = idOrName => resultOf(this.client.get(`/routes/${idOrName}`));

  listPlugin = params => resultOf(this.client.get('/plugins', {params}));
  addPlugin = entity => resultOf(this.client.post('/plugins', entity));
  updatePlugin = entity => resultOf(this.client.patch(`/plugins/${entity.id || entity.name}`, entity));
  deletePlugin = idOrName => resultOf(this.client.delete(`/plugins/${idOrName.id || idOrName}`));
  getPluginByIdOrName = idOrName => resultOf(this.client.get(`/plugins/${idOrName}`));

  listConsumer = params => resultOf(this.client.get('/consumers', {params}));
  addConsumer = entity => resultOf(this.client.post('/consumers', entity));
  updateConsumer = entity => resultOf(this.client.patch(`/consumers/${entity.id || entity.name}`, entity));
  deleteConsumer = idOrName => resultOf(this.client.delete(`/consumers/${idOrName.id || idOrName}`));
  getConsumerByIdOrName = idOrName => resultOf(this.client.get(`/consumers/${idOrName}`));

  listUpstream = params => resultOf(this.client.get('/upstreams', {params}));
  addUpstream = entity => resultOf(this.client.post('/upstreams', entity));
  updateUpstream = entity => resultOf(this.client.patch(`/upstreams/${entity.id || entity.name}`, entity));
  deleteUpstream = idOrName => resultOf(this.client.delete(`/upstreams/${idOrName.id || idOrName}`));
  getUpstreamByIdOrName = idOrName => resultOf(this.client.get(`/upstreams/${idOrName}`));

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
