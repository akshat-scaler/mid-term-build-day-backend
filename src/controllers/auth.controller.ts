import type { Request, Response } from "express";
import { JWT_SECRET } from "../config/index.js";
import { UserModel } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await UserModel.findOne({
      email: email,
    });
    if (userExists) {
      res.status(400).json({
        message: "user exists",
      });
      return;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await UserModel.create({
      email,
      username,
      password: passwordHash,
    });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({
      message: "Invalid server error",
    });
  }
};
export const signin = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      res.json({
        message: "user doesn't exist",
      });
      return;
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      res.status(403).json({
        message: "Password invalid",
      });
    }
    const token = jwt.sign(
      {
        userId: user?._id,
      },
      JWT_SECRET as string
    );
    res.status(201).json({ message: "User signed in", token });
  } catch (error) {
    res.status(500).json({
      message: "Invalid server error",
    });
  }
};
