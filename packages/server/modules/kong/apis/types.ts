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
