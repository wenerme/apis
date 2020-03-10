import {
  KongInformation,
  KongListQuery,
  KongListResponse,
  KongNodeStatus,
  KongRouteEntity,
  KongServiceEntity,
  KongTagEntity
} from 'modules/kong/apis/types';

export interface KongService {
  getInformation(): Promise<KongInformation>

  getNodeStatus(): Promise<KongNodeStatus>

  listTags(query?: KongListQuery): Promise<KongListResponse<KongTagEntity>>

  listService(query?: KongListQuery): Promise<KongListResponse<KongServiceEntity>>

  deleteService(idOrName): Promise<void>

  addService(entity: KongServiceEntity): Promise<KongServiceEntity>

  updateService(entity: KongServiceEntity): Promise<KongServiceEntity>


  getServiceByIdOrName(idOrName): Promise<KongServiceEntity>

  listRoute(query?: KongListQuery): Promise<KongListResponse<KongRouteEntity>>

  addRoute(entity: KongRouteEntity): Promise<KongRouteEntity>

  updateRoute(entity: KongRouteEntity): Promise<KongRouteEntity>

  deleteRoute(idOrName): Promise<void>

  getRouteByIdOrName(idOrName): Promise<KongServiceEntity>

}
