import { Autor } from "../models/autor.js";

const getAll = async (req, res) => {
  try {
    // Obtener todos los autores desde la base de datos
    const autores = await Autor.find({});

    // Devolver un JSON con la lista de autores
    res.json({ autores });
  } catch (error) {
    // Manejar errores durante la consulta a la base de datos
    res
      .status(500)
      .json({ error: "Error fetching autores", details: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const autor = await Autor.findById(req.params.id);

    if (!autor) {
      return res.status(404).json({ message: "Autor not found" });
    }

    res.json({ autor });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching autor", details: error.message });
  }
};

const create = async (req, res) => {
  try {
    // Asegúrate de que los campos necesarios estén presentes en la solicitud
    const { nombre, libros_escritos } = req.body;

    // Verifica que los campos requeridos no estén vacíos
    if (!nombre || !libros_escritos) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    // Crear un nuevo autor con los datos proporcionados
    const autor = new Autor({
      nombre: req.body.name,
      libros_escritos: req.body.escritos.map((libro) => ({
        titulo: libro.titulo,
        ano_publicacion: libro.ano_publicacion,
        // Otros campos relacionados con el libro
      })),
    });

    // Guardar el autor, incluidos los libros escritos embebidos
    const autorSaved = await autor.save();

    res.json({ message: "Autor created successfully", autorSaved });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating autor", details: error.message });
  }
};

const update = async (req, res) => {
  try {
    // Buscar el autor por su ID
    const autor = await Autor.findById(req.params.id);

    // Verificar si el autor fue encontrado
    if (!autor) {
      return res.status(404).json({ message: "Autor not found" });
    }

    // Actualizar el nombre del autor
    autor.nombre = req.body.nombre;

    // Actualizar los libros escritos del autor
    autor.libros_escritos = req.body.escritos.map((libro) => ({
      titulo: libro.titulo,
      ano_publicacion: libro.ano_publicacion,
      // Otros campos relacionados con el libro
    }));

    // Guardar el autor actualizado
    await autor.save();

    // Devolver el autor actualizado en la respuesta
    res.json({ message: "Autor updated successfully", autor });
  } catch (error) {
    // Manejar errores durante la actualización y guardado
    res
      .status(500)
      .json({ error: "Error updating autor", details: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    // Eliminar el autor por su ID
    const autorDeleted = await Autor.deleteOne({ _id: req.params.id });

    // Verificar si el autor fue encontrado y eliminado
    if (autorDeleted.deletedCount === 0) {
      return res.status(404).json({ message: "Autor not found" });
    }

    res.json({ message: "Autor deleted successfully", autorDeleted });
  } catch (error) {
    // Manejar errores durante la eliminación
    res
      .status(500)
      .json({ error: "Error deleting autor", details: error.message });
  }
};

export default { getAll, getOne, create, update, destroy };
