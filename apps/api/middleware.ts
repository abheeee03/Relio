import type { Response, Request, NextFunction } from "express"
import jwt from 'jsonwebtoken'
export const Authenticated = async (req: Request, res: Response, next: NextFunction)=>{
    const headers = req.headers.authorization;
    if(!headers){
        res.json({
            error: "headers not present"
        })
        return
    }
    try{
        let decoded = jwt.verify(headers, process.env.JWT_SECRET as string)
        console.log("jwt is : ", decoded);
        //@ts-ignore
        req.userId = decoded.userId as string;
        next();
    } catch (Err){
        console.log(Err);        
        res.status(403).send("")
    }

}