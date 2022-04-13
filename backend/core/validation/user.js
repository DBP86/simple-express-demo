const getList = {
  skip: { required: true, type:'int', convertType: 'int' },
  limit: { required: true, type: 'int', convertType: 'int' }
};

const getDetail = {
  _id: { required: true, type: 'string' }
};

const create = {
  name: { required: true, type: 'string' },
  dob: { required: true, type: 'string', convertType: 'date' },
  address: { required: true, type: 'string' },
  description: { required: true, type: 'string' },
  longitude: { required: false, type: 'number' },
  latitude: { required: false, type: 'number' }
};

const update = {
  _id: { required: true, type: 'string' },
  name: { required: false, type: 'string' },
  dob: { required: false, type: 'date' },
  address: { required: false, type: 'string' },
  longitude: { required: false, type: 'number' },
  latitude: { required: false, type: 'number' },
  description: { required: false, type: 'string' }
};

const remove = {
  _id: { required: true, type: 'string' }
};

const getNearby = {
  _id: { required: true, type: 'string' },
  radius: { required: true, type:'number', convertType: 'number' },
  unit: { required: true, type: 'enum', values: ['m', 'km', 'ft', 'mi'] }
};

module.exports = {
  getList,
  getDetail,
  create,
  update,
  remove,
  getNearby
};
