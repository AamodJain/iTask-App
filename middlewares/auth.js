import { User } from "../models/user.js";
import jwt from "jsonwebtoken"
import errorHandler from "./error.js";
export const isAuthenticated = async(req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new errorHandler("Login first",404))

    }
    let decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findById(decoded._id)
    req.user = user ;
    next();
}