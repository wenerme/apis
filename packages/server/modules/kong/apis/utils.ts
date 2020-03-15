import {KongEntityService, KongService} from 'modules/kong/apis/service';
import {KongEntity} from 'modules/kong/apis/types';
import {mapValues} from 'lodash';

export function buildEntityService<T extends KongEntity = any>(getKongService: () => KongService, entityName: string, plugin?: (...args) => (next) => any): KongEntityService<T> {
  let v = {
    list: (...args) => getKongService()[`list${entityName}`](...args),
    add: (...args) => getKongService()[`add${entityName}`](...args),
    update: (...args) => getKongService()[`update${entityName}`](...args),
    delete: (...args) => getKongService()[`delete${entityName}`](...args),
    getByIdOrName: (...args) => getKongService()[`get${entityName}ByIdOrName`](...args),
  };
  if (plugin) {
    v = mapValues(v, f => (...args) => plugin(...args)(f))
  }
  return v
}
