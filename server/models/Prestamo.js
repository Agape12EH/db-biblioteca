import { Schema, model } from "mongoose";

export const PrestamoSchema = new Schema({
  usuario:{
    type:Schema.Types.ObjectId,
    ref:'Usuario',
    required:true
  },
  libro:{
    type:Schema.Types.ObjectId,
    ref:'Libro',
    required:true
  },
  fecha_prestamo:{
    type:Date,
    required:true
  },
  fecha_devolucion_esperada:{
    type: Date,
    required: true
  },
  fecha_devolucion_real:{
    type: Date
  }
});

export const Prestamo = model("Prestamo", PrestamoSchema);