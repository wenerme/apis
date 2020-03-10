import axios from 'axios';
import {KongClientService} from 'modules/kong/apis/KongClientService';
import {KongService} from 'modules/kong/apis/service';

export const kongClient = axios.create({
  baseURL: 'http://127.0.0.1:8001'
});

export const kongService: KongService = new KongClientService({client: kongClient});
