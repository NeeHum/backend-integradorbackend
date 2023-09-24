import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './routes/userModel.mjs';
import path from 'path';
import { fileURLToPath } from 'url'; 
import { Product, productSchema } from './routes/productsModel.mjs';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const app = express();

const BASE_URL = 'https://backend-integradorbackend.vercel.app/';

const imagePath = path.join(__dirname, "../client/src/assets/img");
app.use("/assets/img", express.static(imagePath));

// Configurar CORS para permitir solicitudes desde cualquier origen
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Reemplaza con la URL de tu frontend
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json()); // Agrega el middleware para analizar el cuerpo de las solicitudes JSON

const uri =
  "mongodb+srv://superadmin:DD44H4584cFR@cluster0.qud3nn6.mongodb.net/RegisterUser?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
  })
  .catch((error) => {
    console.error("Error en la conexión a la base de datos:", error);
  });

// Modelo y datos iniciales de productos
const initialProducts = [
  {
    id: "CS",
    titulo: "CS: Global Offensive",
    imagen: `${BASE_URL}/assets/img/FPS/01.jpg`,
    categoria: {
      nombre: "FPS",
      id: "FPS",
    },
    precio: 1200,
  },
  {
    id: "EFT",
    titulo: "Escape from Tarkov",
    imagen: `${BASE_URL}/assets/img/FPS/02.jpg`,
    categoria: {
      nombre: "FPS",
      id: "FPS",
    },
    precio: 4500,
  },
  // Resto de los objetos...
];

// Función para cargar los datos iniciales de productos
async function loadInitialProducts() {
  try {
    const existingProducts = await Product.find();
    if (!existingProducts.length) {
      // Solo carga los datos si no hay productos en la base de datos
      await Product.insertMany(initialProducts);
      console.log("Datos iniciales de productos cargados correctamente");
    }
  } catch (error) {
    console.error("Error al cargar datos iniciales de productos:", error);
  }
}

// Llama a la función para cargar los datos iniciales de productos
loadInitialProducts();

// Ruta para registrar usuarios
app.post("/api/usuarios", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Crear un nuevo usuario utilizando el modelo
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    // Guardar el usuario en la base de datos
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// Ruta para iniciar sesión
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

// Ruta para obtener la lista de productos desde la base de datos
app.get("/api/productos", async (req, res) => {
  try {
    const productos = await Product.find(); // Utiliza el modelo de productos
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    res.status(500).json({ error: "Error al obtener la lista de productos" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});

// Ruta para obtener la lista de usuarios desde la base de datos
app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await User.find(); // Utiliza el modelo de usuarios
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error);
    res.status(500).json({ error: "Error al obtener la lista de usuarios" });
  }
});
