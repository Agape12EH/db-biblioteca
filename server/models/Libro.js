import { Schema, model } from "mongoose";
import { AutorSchema } from "./Autor.js";

export const LibroSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  age_published: {
    type: Date,
    requied: true,
  },
  autor: {
    type: AutorSchema,
    required: true,
  },
});

export const Libro = model("Libro", LibroSchema);
