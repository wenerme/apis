import {
  KongConsumerEntity,
  KongInformation,
  KongListQuery,
  KongListResponse,
  KongNodeStatus,
  KongPluginEntity,
  KongPluginSchema,
  KongRouteEntity,
  KongServiceEntity,
  KongTagEntity,
  KongUpstreamEntity
} from 'modules/kong/apis/types';

export interface KongService {
  getInformation(): Promise<KongInformation>

  getNodeStatus(): Promise<KongNodeStatus>

  getPluginSchema(name): Promise<KongPluginSchema>

  listTags(query?: KongListQuery): Promise<KongListResponse<KongTagEntity>>

  // region Service

  listService(query?: KongListQuery): Promise<KongListResponse<KongServiceEntity>>

  deleteService(idOrName): Promise<void>

  addService(entity: KongServiceEntity): Promise<KongServiceEntity>

  updateService(entity: KongServiceEntity): Promise<KongServiceEntity>


  getServiceByIdOrName(idOrName): Promise<KongServiceEntity>

  // endregion

  // region Route

  listRoute(query?: KongListQuery): Promise<KongListResponse<KongRouteEntity>>

  addRoute(entity: KongRouteEntity): Promise<KongRouteEntity>

  updateRoute(entity: KongRouteEntity): Promise<KongRouteEntity>

  deleteRoute(idOrName): Promise<void>

  getRouteByIdOrName(idOrName): Promise<KongServiceEntity>

  // endregion

  // region Plugin

  listPlugin(query?: KongListQuery): Promise<KongListResponse<KongPluginEntity>>

  addPlugin(entity: KongPluginEntity): Promise<KongPluginEntity>

  updatePlugin(entity: KongPluginEntity): Promise<KongPluginEntity>

  deletePlugin(idOrName): Promise<void>

  getPluginByIdOrName(idOrName): Promise<KongServiceEntity>

  // endregion

  // region Consumer

  listConsumer(query?: KongListQuery): Promise<KongListResponse<KongConsumerEntity>>

  addConsumer(entity: KongConsumerEntity): Promise<KongConsumerEntity>

  updateConsumer(entity: KongConsumerEntity): Promise<KongConsumerEntity>

  deleteConsumer(idOrName): Promise<void>

  getConsumerByIdOrName(idOrName): Promise<KongServiceEntity>

  // endregion

  // region Upstream
  listUpstream(query?: KongListQuery): Promise<KongListResponse<KongUpstreamEntity>>

  addUpstream(entity: KongUpstreamEntity): Promise<KongUpstreamEntity>

  updateUpstream(entity: KongUpstreamEntity): Promise<KongUpstreamEntity>

  deleteUpstream(idOrName): Promise<void>

  getUpstreamByIdOrName(idOrName): Promise<KongServiceEntity>

  // endregion
}
