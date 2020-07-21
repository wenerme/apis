import {
  getServiceMetadataOfType,
  getServicePathOfCoordinate,
  ServiceConsumeOptions,
  ServiceConsumer,
  ServiceConsumeType,
  ServiceProvider,
} from '../interfaces';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class ServiceConsumerManager implements ServiceConsumer {
  client = axios.create({
    baseURL: './api/service',
    timeout: 30000,
    // headers: {'X-Custom-Header': 'foobar'}
  });
  private _services: Record<string, any> = {};
  /**
   * Use provider to override service
   */
  private _provider?: ServiceProvider;

  set provider(v: ServiceProvider) {
    this._provider = v;
  }

  consume<T>(coord: ServiceConsumeType<T>): T {
    let options: ServiceConsumeOptions<T>;
    if ('prototype' in coord) {
      options = getServiceMetadataOfType(coord);
    } else {
      options = coord;
      if (options.type) {
        options = Object.assign(getServiceMetadataOfType(options.type), options);
      }
    }

    if (this._provider) {
      const target = this._provider.findRegistry(options)?.target;
      if (target) {
        return target;
      }
    }

    const client = this.client;
    const key = getServicePathOfCoordinate(options);

    return (
      this._services[key] ||
      (this._services[key] = new Proxy<any>(
        {} as any,
        new ServiceProxy({
          client,
          options: options,
        }),
      ))
    );
  }
}

class ServiceProxy<T extends Record<string, unknown>> implements ProxyHandler<T> {
  client: AxiosInstance;
  options: ServiceConsumeOptions<T>;
  private _methods = {};

  constructor({ client, options }) {
    this.client = client;
    this.options = options;
  }

  get(target: T, p: PropertyKey, receiver: any): any {
    if (this._methods[p]) {
      return this._methods[p];
    }
    const method = String(p);

    return (this._methods[p] = async (...params) => {
      const path = `${getServicePathOfCoordinate(this.options as any)}/invoke/${method}`;
      let resp: AxiosResponse;
      try {
        resp = await this.client.post(path, {
          id: Date.now() + '',
          method,
          params,
        });
      } catch (e) {
        resp = e.response || {
          data: {
            error: { message: e.message, exception: e, code: 500 },
          },
        };
      }
      if (resp.data.error) {
        // console.error(`Error ${path}`,resp)
        const { code, message } = resp.data.error;
        console.error(`INVOKE ${path} failed: ${code} - ${message}`);
        throw Object.assign(new Error(message), { response: resp });
      }
      return resp.data.result;
    });
  }
}
