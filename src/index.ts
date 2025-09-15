import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import notesRouter from "./routes/notes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", notesRouter);
app.listen(3000, () => {
  console.log("Server up at port 3000");
});
