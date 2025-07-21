const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

exports.register = async (userData) => {
  try {
    const existingUser = await User.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { username: userData.username },
          { email: userData.email }
        ]
      }
    });

    if (existingUser) {
      throw new Error('Username or email already in use');
    }

    const user = await User.create(userData);
    
    const token = generateToken(user);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    };
  } catch (error) {
    throw error;
  }
};

exports.login = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await user.validPassword(password);

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const token = generateToken(user);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    };
  } catch (error) {
    throw error;
  }
};
