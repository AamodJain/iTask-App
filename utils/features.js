import jwt from "jsonwebtoken"

export const setCookie = (res,user,statusCode,message) => {
    const token = jwt.sign({_id : user._id},process.env.JWT_SECRET)
    res
    .status(statusCode)
    .cookie("token",token,{
        httpOnly : true ,
        maxAge : 15*60*1000 , 
        sameSite : (process.env.MODE==="Development" ? "lax" : "none") ,
        secure : (process.env.MODE==="Development" ? false : true)
    })
    .json({success : true , message})
}
