import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { setCookie } from "../utils/features.js";
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt';
import errorHandler from "../middlewares/error.js";

export const logout = (req,res) => {
  res
  .status(200)
  .cookie("token","",{ maxAge : 0 ,sameSite : (process.env.MODE==="Development" ? "lax" : "none") ,
  secure : (process.env.MODE==="Development" ? false : true)})
  .json({success : true , message : "logged out successfully"})
}

export const login = async (req, res,next) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");
    if(user){
        let isMatched = await bcrypt.compare(password,user.password);
        if(isMatched){
            setCookie(res,user,201,`Welcome Back ${user.name}`)
        }
        else{
            return next(new errorHandler("Invalid Password",404));
        }
    }
    else{
        return next(new errorHandler("User not found\nPlease register",404));
    }
}


export const register = async (req, res,next) => {
    let { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
        return next(new errorHandler("user already exists",404));
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        user.save()
        setCookie(res, user, 201, "registered successfully")
    }
}

export const getMyProfile = (req,res) => {
    return res
    .status(200)
    .json({
        success : true, user : (req.user)
    })
}



