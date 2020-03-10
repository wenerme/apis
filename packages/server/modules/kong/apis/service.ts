import {
  KongInformation,
  KongListQuery,
  KongListResponse,
  KongNodeStatus,
  KongServiceEntity,
  KongTagEntity
} from 'modules/kong/apis/types';

export interface KongService {
  getInformation(): Promise<KongInformation>

  getNodeStatus(): Promise<KongNodeStatus>

  listTags(query?: KongListQuery): Promise<KongListResponse<KongTagEntity>>

  listServices(query?: KongListQuery): Promise<KongListResponse<KongServiceEntity>>

  deleteService(idOrName): Promise<void>

  addService(entity: KongServiceEntity): Promise<KongServiceEntity>

  updateService(entity: KongServiceEntity): Promise<KongServiceEntity>


  getServiceByIdOrName(idOrName): Promise<KongServiceEntity>
}
