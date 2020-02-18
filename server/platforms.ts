import {ApiError} from 'next/dist/next-server/server/api-utils';

export const SupportedPlatforms = ['NOW', 'HEROKU', 'LOCAL', 'NORMAL'];

export function platformNotSupported(platform: string) {
  if (process.env.BUILD_PLATFORM.toLowerCase() === platform.toLowerCase()) {
    throw new ApiError(400, 'not impl')
  }
}
