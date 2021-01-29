import { KongService } from './service';

let kongService: KongService;
export const setKongService = (v) => (kongService = v);
export const getKongService = () => kongService;
