const db = require('../models');
const apiResponse = require('../utils/apiResponse');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await db.User.findAll({
      attributes: ['id', 'username', 'email']
    });
    apiResponse.success(res, { users });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email']
    });
    
    if (!user) {
      return apiResponse.error(res, 'User not found', 404);
    }
    
    apiResponse.success(res, { user });
  } catch (error) {
    next(error);
  }
};
