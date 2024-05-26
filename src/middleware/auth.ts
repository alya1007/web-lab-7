import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user as string | JwtPayload;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default authenticateJWT;
