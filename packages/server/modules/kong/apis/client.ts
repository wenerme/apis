import {KongService} from 'modules/kong/apis/service';

let kongService: KongService
export const setKongService = v => kongService = v;
export const getKongService = () => kongService

