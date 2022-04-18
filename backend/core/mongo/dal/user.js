const _ = require('lodash');
const mongoose = require('mongoose');
const userModel = mongoose.model('user');

const count = async (params) => {
  const filter = _.pick(params, ['_id', 'location']);
  const count = await userModel.count(filter);
  return count;
};

const findAll = async (params) => {
  const query = _.pick(params, ['_id']);
  const pro = {};
  const opt = _.pick(params, ['limit', 'skip', 'sort']);
  const data = await userModel.find(query, pro, opt);
  return data;
};

const create = async (params) => {
  const filter = _.pick(params, ['name', 'dob', 'address', 'description', 'location', 'createdAt']);
  const data = await userModel.create(filter);
  return data;
};

const findOneAndUpdate = async (params) => {
  const filter = _.pick(params, ['_id']);
  const update = _.pick(params, ['name', 'dob', 'address', 'description', 'location', 'createdAt']);
  const opt = { new: true };
  const data = await userModel.findOneAndUpdate(filter, update, opt);
  return data;
};

const findByIdAndDelete = async (_id) => {
  return await userModel.findByIdAndDelete(_id);
};

const findOne = async (params) => {
  const filter = _.pick(params, ['_id', 'name', 'password']);
  const user = await userModel.findOne(filter);
  return user;
};

const getNearbyUsers = async (params) => {
  const result =  await userModel.aggregate([
    {
      $geoNear: { 
        near: params.near,
        spherical: true,
        distanceMultiplier: 6378137,
        maxDistance: params.max / 6378137,
        distanceField: 'distance'
      }
    }
  ]);
  return result;
};

module.exports = {
  count,
  findAll,
  create,
  findOneAndUpdate,
  findByIdAndDelete,
  findOne,
  getNearbyUsers
};
