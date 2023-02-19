'use strict';

import container from '../../core/boot';
import { FilterColumns } from './FilterColumns';

export async function ImportDao (routePath) {
  const DAO = import(routePath);
  const dao = await DAO;
  console.log(`Importing`, dao);
  let { columns } = dao.default(container);
  const { options } = dao.default(container);
  let associations = [];
  if (dao.default(container)?.getAssociations) {
    associations = dao.default(container).getAssociations();
  }
  columns = FilterColumns(columns);
  return { columns, options, associations };
}