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
  listConsumerBasicAuth;
  addConsumerBasicAuth;
  updateConsumerBasicAuth;
  deleteConsumerBasicAuth;
  getConsumerBasicAuthByIdOrName;
  //
  listUpstream;
  addUpstream;
  updateUpstream;
  deleteUpstream;
  getUpstreamByIdOrName;
  //
  listUpstreamTarget;
  addUpstreamTarget;
  updateUpstreamTarget;
  deleteUpstreamTarget;
  getUpstreamTargetByIdOrName;

  constructor(init: KongClientServiceInit) {
    this.client = init.client;
    Object.assign(this, buildRestMethod('Service', this.client));
    Object.assign(this, buildRestMethod('Route', this.client));
    Object.assign(this, buildRestMethod('Certificate', this.client));
    Object.assign(this, buildRestMethod('CaCertificate', this.client));
    Object.assign(this, buildRestMethod('Plugin', this.client));
    Object.assign(this, buildRestMethod('Consumer', this.client));
    Object.assign(this, buildRestMethod('Upstream', this.client));
    Object.assign(this, buildRestMethod('Snis', this.client));

    Object.assign(this, buildExplicitNestRestMethod('UpstreamTarget', this.client, {
      path: 'targets',
      parentPath: 'upstreams'
    }));
    Object.assign(this, buildExplicitNestRestMethod('ConsumerBasicAuth', this.client, {
      path: 'basic-auth',
      parentPath: 'consumers'
    }));
    // TODO add interface
    Object.assign(this, buildExplicitNestRestMethod('ConsumerKeyAuth', this.client, {
      path: 'key-auth',
      parentPath: 'consumers'
    }));
    Object.assign(this, buildExplicitNestRestMethod('ConsumerHmacAuth', this.client, {
      path: 'hmac-auth',
      parentPath: 'consumers'
    }));
    Object.assign(this, buildExplicitNestRestMethod('ConsumerAcl', this.client, {
      path: 'acls',
      parentPath: 'consumers'
    }));
    Object.assign(this, buildExplicitNestRestMethod('ConsumerOAuth2', this.client, {
      path: 'oauth2',
      parentPath: 'consumers'
    }));
    Object.assign(this, buildExplicitNestRestMethod('ConsumerJwt', this.client, {
      path: 'jwt',
      parentPath: 'consumers'
    }));

    Object.assign(this, buildExplicitNestRestMethod('ServiceRoute', this.client, {
      path: 'routes',
      parentPath: 'services'
    }))
  }

  getInformation = () => resultOf(this.client.get('/'));
  getNodeStatus = () => resultOf(this.client.get('/status'));
  getPluginSchema = name => resultOf(this.client.get(`/plugins/schema/${name}`));
  listTags = ({tag, ...params}) => resultOf(this.client.get(`/tags/${tag}`, {params}));
  listAllTags = params => resultOf(this.client.get('/tags', {params}));
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


function buildExplicitNestRestMethod(name: string, client, {path = '', parentPath}) {
  const n = name;
  const p = path || inflection.underscore(inflection.pluralize(name)).toLowerCase();
  const pp = parentPath;
  return {
    [`list${n}`]: (parent, params) => resultOf(client.get(`/${pp}/${idOrName(parent)}/${p}`, {params})),
    [`add${n}`]: (parent, entity) => resultOf(client.post(`/${pp}/${idOrName(parent)}/${p}`, entity)),
    [`update${n}`]: (parent, entity) => resultOf(client.patch(`/${pp}/${idOrName(parent)}/${p}/${idOrName(entity)}`, entity)),
    [`delete${n}`]: (parent, entity) => resultOf(client.delete(`/${pp}/${idOrName(parent)}/${p}/${idOrName(entity)}`)),
    [`get${n}ByIdOrName`]: (parent, entity) => resultOf(client.get(`/${pp}/${idOrName(parent)}/${p}/${idOrName(entity)}`)),
  };
}

