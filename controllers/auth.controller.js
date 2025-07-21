const authService = require('../services/auth.service');
const apiResponse = require('../utils/apiResponse');
const db = require('../models');

exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    apiResponse.success(res, result, 201);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    apiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.userId, {
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
