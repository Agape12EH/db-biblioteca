import { Schema, model } from "mongoose";

export const AutorSchema = new Schema({
  nombre: {
    type: "String",
    required: true,
  },
});

export const Autor = model("Autor", AutorSchema);
