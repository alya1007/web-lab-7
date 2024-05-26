import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (req: Request, res: Response) => {
  const { username, permissions } = req.body;
  const token = jwt.sign({ username, permissions }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  res.json({ token });
};
