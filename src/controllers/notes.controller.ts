import type { Request, Response } from "express";
import { NotesModel } from "../models/index.js";
import { notesSchema } from "../validators/index.js";
export const createNotes = async (req: Request, res: Response) => {
  try {
    const { data, error } = notesSchema.safeParse(req.body);
    if (error) {
      res.status(401).json({
        message: "Invalid Inputs",
      });
    }
    const note = await NotesModel.create({
      title: data?.title,
      content: data?.content,
      tags: data?.tags,
    });
    res.status(200).json({
      message: "Notes created",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const { tag } = req.query;
    const notes = await NotesModel.find({
      tags: tag,
      userId: req.userId,
    });
    res.status(200).json({
      message: "Notes received",
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const changeNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const note = await NotesModel.updateOne(
      {
        _id: id,
        userId: req.userId,
      },
      {
        title,
        content,
        tags,
      }
    );
    res.status(200).json({
      message: "Notes created",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await NotesModel.deleteOne({
      _id: id,
      userId: req.userId,
    });
    res.status(200).json({
      message: "Note deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
