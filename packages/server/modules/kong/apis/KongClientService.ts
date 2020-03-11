import {KongService} from 'modules/kong/apis/service';
import {KongErrorResponse} from 'modules/kong/apis/types';
import {AxiosInstance, AxiosResponse} from 'axios';
import inflection from 'inflection';

export interface KongClientServiceInit {
  client: AxiosInstance;
}

export class KongClientService implements KongService {
  client: AxiosInstance;
  // type check
  listService;
  addService;
  updateService;
  deleteService;
  getServiceByIdOrName;
  //
  listRoute;
  addRoute;
  updateRoute;
  deleteRoute;
  getRouteByIdOrName;
  //
  listCertificate;
  addCertificate;
  updateCertificate;
  deleteCertificate;
  getCertificateByIdOrName;
  //
  listCaCertificate;
  addCaCertificate;
  updateCaCertificate;
  deleteCaCertificate;
  getCaCertificateByIdOrName;
  //
  listSnis;
  addSnis;
  updateSnis;
  deleteSnis;
  getSnisByIdOrName;
  //
  listPlugin;
  addPlugin;
  updatePlugin;
  deletePlugin;
  getPluginByIdOrName;
  //
  listConsumer;
  addConsumer;
  updateConsumer;
  deleteConsumer;
  getConsumerByIdOrName;
  //
  listUpstream;
  addUpstream;
  updateUpstream;
  deleteUpstream;
  getUpstreamByIdOrName;

  constructor(init: KongClientServiceInit) {
    this.client = init.client;
    Object.assign(this, buildRestMethod('Service', this.client));
    Object.assign(this, buildRestMethod('Route', this.client));
    Object.assign(this, buildRestMethod('Certificate', this.client));
    Object.assign(this, buildRestMethod('CaCertificate', this.client));
    Object.assign(this, buildRestMethod('Plugin', this.client));
    Object.assign(this, buildRestMethod('Consumer', this.client));
    Object.assign(this, buildRestMethod('Upstream', this.client))
    Object.assign(this, buildRestMethod('Snis', this.client))
  }

  getInformation = () => resultOf(this.client.get('/'));
  getNodeStatus = () => resultOf(this.client.get('/status'));
  getPluginSchema = name => resultOf(this.client.get(`/plugins/schema/${name}`));
  listTags = params => resultOf(this.client.get('/tags', {params}))
}

function buildRestMethod(name: string, client, {path = ''} = {}) {
  const n = name;
  const p = path || inflection.underscore(inflection.pluralize(name)).toLowerCase();
  return {
    [`list${n}`]: params => resultOf(client.get(`/${p}`, {params})),
    [`add${n}`]: entity => resultOf(client.post(`/${p}`, entity)),
    [`update${n}`]: entity => resultOf(client.patch(`/${p}/${entity.id || entity.name}`, entity)),
    [`delete${n}`]: idOrName => resultOf(client.delete(`/${p}/${idOrName.id || idOrName}`)),
    [`get${n}ByIdOrName`]: idOrName => resultOf(client.get(`/${p}/${idOrName}`)),
  };
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
