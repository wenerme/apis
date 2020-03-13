import {KongService} from 'modules/kong/apis/service';
import {AxiosInstance} from 'axios';
import inflection from 'inflection';
import {resultOf} from 'utils/axioses';

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
    Object.assign(this, buildRestMethod('Upstream', this.client));
    Object.assign(this, buildRestMethod('Snis', this.client))
  }

  getInformation = () => resultOf(this.client.get('/'));
  getNodeStatus = () => resultOf(this.client.get('/status'));
  getPluginSchema = name => resultOf(this.client.get(`/plugins/schema/${name}`));
  listTags = params => resultOf(this.client.get('/tags', {params}));

  listUpstreamTarget = ({upstream, ...params}) => resultOf(this.client.get(`/upstreams/${idOrName(upstream)}/targets`, {params}));
  addUpstreamTarget = entity => resultOf(this.client.post(`/upstreams/${idOrName(entity.upstream)}/targets`, entity));
  updateUpstreamTarget = entity => resultOf(this.client.post(`/upstreams/${idOrName(entity.upstream)}/targets/${idOrName(entity)}`, entity));
  deleteUpstreamTarget = entity => resultOf(this.client.delete(`/upstreams/${idOrName(entity.upstream)}/targets/${idOrName(entity)}`));
  getUpstreamTargetByIdOrName = entity => resultOf(this.client.get(`/upstreams/${idOrName(entity.upstream)}/targets/${idOrName(entity)}`))
}

function idOrName(v) {
  if (!v) {
    console.warn(`entity no identity`);
    return ''
  }
  if (typeof v === 'string') {
    return v
  }
  return v.id || v.name
}

function buildRestMethod(name: string, client, {path = ''} = {}) {
  const n = name;
  const p = path || inflection.underscore(inflection.pluralize(name)).toLowerCase();
  return {
    [`list${n}`]: params => resultOf(client.get(`/${p}`, {params})),
    [`add${n}`]: entity => resultOf(client.post(`/${p}`, entity)),
    [`update${n}`]: entity => resultOf(client.patch(`/${p}/${idOrName(entity)}`, entity)),
    [`delete${n}`]: entity => resultOf(client.delete(`/${p}/${idOrName(entity)}`)),
    [`get${n}ByIdOrName`]: entity => resultOf(client.get(`/${p}/${idOrName(entity)}`)),
  };
}
