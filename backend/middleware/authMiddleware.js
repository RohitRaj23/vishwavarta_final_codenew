import asynchandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../Models/UserModel.js';

export const protect = asynchandler(async (req, res, next) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token)
      
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select("-password");
      console.log(req.user);
      console.log(decoded._id);
      next();
    } catch (error) {
      res.status(401).json({message:"Not authorized, token failed",error:error.message,stack:error.stack});
    }
  }

  if (!token) {
    res.status(402).json({message:"Not authorized, no token"})
  }
})
