import { Schema, model } from "mongoose";

export const UsuarioSchema = new Schema({
  nombre:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  libros_prestados:
    {
    type:Schema.Types.ObjectId,
    ref:"Prestamo",
  }
})

export const Usuario = model("Usuario", UsuarioSchema);