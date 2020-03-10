import {KongService} from 'modules/kong/apis/service';
import {KongListQuery, KongListResponse, KongServiceEntity, KongTagEntity} from 'modules/kong/apis/types';
import {AxiosInstance} from 'axios';

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

  getServiceByIdOrName(idOrName): Promise<KongServiceEntity> {
    return undefined;
  }

  listServices(params?: KongListQuery): Promise<KongListResponse<KongServiceEntity>> {
    return this.client.get('/services', {params}).then(v => v.data);
  }

  deleteService = (idOrName) => this.client.delete(`/services/${idOrName}`).then(v => v.data);

  addService(entity: KongServiceEntity): Promise<KongServiceEntity> {
    return this.client.post('/services', entity).then(v => v.data);
  }

  updateService(entity: KongServiceEntity): Promise<KongServiceEntity> {
    return this.client.post(`/services/${entity.id}`, entity).then(v => v.data);
  }

  listTags(params?: KongListQuery): Promise<KongListResponse<KongTagEntity>> {
    return this.client.get('/tags', {params}).then(v => v.data);
  }


}
