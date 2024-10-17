// import jwt from "jsonwebtoken";
// import createError from "../utils/createError.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.accessToken;
//   if (!token) return next(createError(401,"You are not authenticated!"))


//   jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
//     if (err) return next(createError(403,"Token is not valid!"))
//     req.userId = payload.id;
//     req.isSeller = payload.isSeller;
//     next()
//   });
// };


import jwt from 'jsonwebtoken';
import User from '../models/auth/UserModel.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};
