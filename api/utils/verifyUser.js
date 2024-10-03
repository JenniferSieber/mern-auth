import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log('hello')
    console.log(req.cookies.access_token)
    //const token = req.cookies.access_token || req.headers['authorization']?.split(' ')[1]; // Check headers as well
    console.log(token)
    
    if (!token) return next(errorHandler(401, 'You are not authenticated!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        req.user = user;
        next();
    });


}