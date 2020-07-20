import { ServiceConsumerManager } from 'src/modules/service/consumer/ServiceConsumerManager';
import { ServiceConsumeType, ServiceRegistration } from 'src/modules/service/interfaces';
import { ServiceProviderManager } from 'src/modules/service/provider/ServiceProviderManager';

/// reexport service
export * from 'src/modules/service/interfaces';

const client = new ServiceConsumerManager();
const provider = new ServiceProviderManager();
client.provider = provider;

export const ClientConsumers = client;

export function consumeClientService<T>(coord: ServiceConsumeType<T>): T {
  return client.consume(coord);
}
export function overrideClientService(s: ServiceRegistration) {
  provider.registry(s);
}

// ========== SERVICES

export abstract class PasswordStrengthService {
  static service = 'me.wener.apis.password.PasswordStrengthService';
  abstract zxcvbn(password: string): Promise<any>;
}
