import jwt from 'jsonwebtoken'

export default function verifyToken(req){
    const token = req.headers.get('authorization').split(" ")[1]
     if(!token) throw new Error("Token missing");
    
    return jwt.verify(token, process.env.SECRET_KEY)
}