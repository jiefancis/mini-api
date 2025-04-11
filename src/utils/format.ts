import * as util from 'util';
import * as _ from 'lodash';
import { Between, In, Like } from 'typeorm';

export const utilFormat = (key, value) => {
  return util.format(key, value);
};

export const listPageParamsFormat = (data) => {
  const where: Record<string, any> = {};
  if (!_.isEmpty(data)) {
    _.keys(data).forEach((key) => {
      if (key === 'keyword') {
        where.name = Like(`%${data[key]}%`);
      } else if (key === 'priceRange') {
        // WHERE price BETWEEN data[key][0] AND data[key][1]
        where.price = Between(data[key][0], data[key][1]);
      } else if (key === 'categoryIds' && data[key]?.length) {
        // WHERE categoryId id IN (1, 2, 3, 4)
        where.categoryId = In(data[key]);
      }
    });
  }

  return where;
};
