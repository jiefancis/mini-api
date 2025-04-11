import * as util from 'util';
import * as _ from 'lodash';
import { Between, In } from 'typeorm';

export const utilFormat = (key, value) => {
  return util.format(key, value);
};

export const listPageParamsFormat = (data) => {
  const where: Record<string, any> = {};
  if (!_.isEmpty(data)) {
    _.entr(data).forEach((key) => {
      if (key === 'priceRange') {
        // WHERE price BETWEEN data[key][0] AND data[key][1]
        where.price = Between(data[key][0], data[key][1]);
      } else if (
        (key === 'categoryIds' || key === 'groupIds') &&
        data[key]?.length
      ) {
        // WHERE id IN (1, 2, 3, 4)
        where[key] = In(data[key]);
      }
    });
  }

  return where;
};
