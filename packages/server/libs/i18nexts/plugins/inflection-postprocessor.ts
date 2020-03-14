import inflection from 'inflection';
import {Module} from 'i18next';

export const i18nextInflection: Module & any = {
  name: 'inflection',
  type: 'postProcessor',
  process(value, key, options, translator) {
    // only support en
    if (!translator.language.startsWith('en')) {
      return value
    }
    const opts = {...options};
    if (typeof opts.count === 'number') {
      if (opts.count === 1) {
        opts.singularize = true
      } else {
        opts.pluralize = true
      }
    }

    if (opts.pluralize) value = inflection.pluralize(value);
    if (opts.singularize) value = inflection.singularize(value);
    if (opts.camelize) value = inflection.camelize(value);
    if (opts.underscore) value = inflection.underscore(value);
    if (opts.humanize) value = inflection.humanize(value);
    if (opts.capitalize) value = inflection.capitalize(value);
    if (opts.dasherize) value = inflection.dasherize(value);
    if (opts.titleize) value = inflection.titleize(value);
    if (opts.demodulize) value = inflection.demodulize(value);
    if (opts.tableize) value = inflection.tableize(value);
    if (opts.classify) value = inflection.classify(value);
    if (opts.foreign_key) value = inflection.foreign_key(value);
    if (opts.ordinalize) value = inflection.ordinalize(value);

    return value;
  }
};
