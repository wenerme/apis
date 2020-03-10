export interface KongInformation {
  plugins: {
    enabled_in_cluster: string[]
    available_on_server: Record<string, boolean>
  }

  tagline: string

  configuration: any

  version: string
  lua_version: string

  prng_seeds: Record<string, number>
  timers: Record<string, number>
  hostname: string
}

export interface KongNodeStatus {
  database: { reachable: boolean }

  server: {
    total_requests: number,
    connections_active: number,
    connections_accepted: number,
    connections_handled: number,
    connections_reading: number,
    connections_writing: number,
    connections_waiting: number,
  }

  memory: {
    workers_lua_vms: Array<{ http_allocated_gc: string, pid: number }>,
    lua_shared_dicts: Record<string, { allocated_slabs: string, capacity: string }>
  }
}

export interface KongTagEntity {
  entity_name: string
  entity_id: string
  tag: string
}

export interface KongServiceEntity extends KongEntity {
  name: string
  retries: number
  protocol: string
  host: string
  port: number
  path: string
  connect_timeout: number
  write_timeout: number
  read_timeout: number
  client_certificate: { id: string }
}


export interface KongRouteEntity extends KongEntity {
  name: string
  protocols: string[]
  methods: string[]
  hosts: string[]
  paths: string[]
  headers: Record<string, string[]>
  https_redirect_status_code: number,
  regex_priority: number,
  strip_path: boolean,
  path_handling: string,
  preserve_host: boolean,

  service: { id: string }
}

export interface KongUpstreamEntity extends KongEntity {

}


export interface KongEntity {
  id: string
  created_at: number
  updated_at: number

  tags: string[]
}

export interface KongListResponse<T> {
  data: T[],
  offset: string
  next: string
}

export interface KongListQuery {
  tags?: string
  offset?: string
}

export interface KongErrorResponse {
  message: string
  name: string
  fields: Record<string, string>
  code: number
}
