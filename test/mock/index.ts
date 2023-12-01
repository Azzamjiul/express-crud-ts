import * as sinon from 'sinon';

export const mockModel = (attributes: any = {}) => {
  const stubs: Record<string, sinon.SinonStub> = {};

  const mockInstance = {
    ...attributes,
  };

  const methods = [
    'init',
    'removeAttribute',
    'sync',
    'drop',
    'schema',
    'getTableName',
    'scope',
    'addScope',
    'findAll',
    'findByPk',
    'findOne',
    'aggregate',
    'count',
    'findAndCountAll',
    'max',
    'min',
    'sum',
    'build',
    'bulkBuild',
    'create',
    'findOrBuild',
    'findOrCreate',
    'upsert',
    'bulkCreate',
    'truncate',
    'destroy',
    'restore',
    'update',
    'increment',
    'describe',
    'unscoped',
    'beforeValidate',
    'afterValidate',
    'beforeCreate',
    'afterCreate',
    'beforeDestroy',
    'afterDestroy',
    'beforeUpdate',
    'afterUpdate',
    'beforeBulkCreate',
    'afterBulkCreate',
    'beforeBulkDestroy',
    'afterBulkDestroy',
    'beforeBulkUpdate',
    'afterBulkUpdate',
    'beforeFind',
    'beforeCount',
    'beforeFindAfterExpandIncludeAll',
    'beforeFindAfterOptions',
    'afterFind',
    'beforeBulkSync',
    'afterBulkSync',
    'beforeSync',
    'afterSync',
    'hasOne',
    'belongsTo',
    'hasMany',
    'belongsToMany',
  ];

  for (const method of methods) {
    stubs[method] = sinon.stub().resolves();
    mockInstance[method] = stubs[method];
  }

  return mockInstance;
};