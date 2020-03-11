export const ProtocolTypes = ['grpc', 'grpcs', 'http', 'https', 'tcp', 'tls']

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

export interface KongConsumerEntity extends KongEntity {
  username: string
  custom_id: string
}

export interface KongPluginEntity extends KongEntity {
  name: string
  route?: KongEntityRef
  service?: KongEntityRef
  consumer?: KongEntityRef
  config: any
  protocols: string[]
  enabled: boolean
}

/// https://github.com/Kong/kong/blob/master/kong/db/schema/init.lua
/// https://github.com/Kong/kong/blob/master/kong/db/schema/typedefs.lua
export interface KongPluginSchema {
  default?
  required?: boolean
  type: 'set' | 'map' | 'string' | 'array' | 'integer' | 'function' | 'number' | 'boolean' | 'foreign' | 'record'
  uuid?: boolean
  legacy?: boolean
  elements?: KongPluginSchema
  reference?
  one_of?: string[]
  at_least_one_of?: string[]
  unique?: boolean
  between?: number[]
  gt?: number
  is_regex?: boolean
  len_min?: number
  keys?
  values?: KongPluginSchema
  fields?: Array<Record<string, KongPluginSchema>>

  entity_checks?: Array<Record<string, KongPluginSchema>>
  match?: string
  err?: string
}

export interface KongCertificateEntity extends KongEntity {
  cert: string
  key: string
}

export interface KongCaCertificateEntity extends KongEntity {
  cert: string
}

export interface KongSnisEntity extends KongEntity {
  name: string
  certificate: KongEntityRef
}

export interface KongUpstreamEntity extends KongEntity {
  name: string
  algorithm: 'consistent-hashing' | 'least-connections' | 'round-robin'
  hash_on: 'none' | 'consumer' | 'ip' | 'header' | 'cookie'
  hash_fallback: 'none' | 'consumer' | 'ip' | 'header' | 'cookie'

  hash_on_header?: string
  hash_fallback_header?: string

  hash_on_cookie_path: string

  /// 10-65536
  slots: number
  host_header: string

  healthchecks: {
    'active': {
      'https_verify_certificate': true,
      'unhealthy': {
        'http_statuses': [429, 404, 500, 501, 502, 503, 504, 505],
        'tcp_failures': 0,
        'timeouts': 0,
        'http_failures': 0,
        'interval': 0
      },
      'http_path': '/',
      'timeout': 1,
      'healthy': {
        'http_statuses': [200, 302],
        'interval': 0,
        'successes': 0
      },
      'https_sni': 'example.com',
      'concurrency': 10,
      'type': 'http'
    },
    'passive': {
      'unhealthy': {
        'http_failures': 0,
        'http_statuses': [429, 500, 503],
        'tcp_failures': 0,
        'timeouts': 0
      },
      'type': 'http',
      'healthy': {
        'successes': 0,
        'http_statuses': [200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308]
      }
    },
    threshold: number
  }
}

export interface KongEntityRef {
  id: string
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
