import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeaders = req.headers.authorization;
    const token = authHeaders?.split(" ")[1];
    if (!token) {
      res.status(400).json({
        message: "No token",
      });
    }
    const decoded = jwt.verify(token as string, JWT_SECRET as string);
    if (!decoded) {
      res.status(403).json({
        message: "not correct user",
      });
    }
    req.userId = (decoded as JwtPayload).userId
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
