import { MONGO_URL } from "../config/index.js";
import mongoose, { Model, Schema } from "mongoose";
mongoose
  .connect(`${MONGO_URL}/notesvault`)
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("error connecting db");
  });

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("User", userSchema);
const notesSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

export const NotesModel = mongoose.model("Notes", notesSchema);
