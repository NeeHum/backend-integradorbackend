import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./routes/userModel.mjs";
import path from "path";
import { fileURLToPath } from "url";
import { Product, productSchema } from "./routes/productsModel.mjs";
import "dotenv/config";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const BASE_URL = "backend-integradorbackend.vercel.app";

const imagePath = path.join(__dirname, "../client/src/assets/img");
app.use("/assets/img", express.static(imagePath));

// Configuracion de CORS para aceptar peticiones desde cualquier origen
app.use(cors());

app.use(bodyParser.json()); // Middleware

mongoose
  .connect(process.env.MONGODB_URI, {
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
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/FPS/01.jpg?raw=true`,
    categoria: {
      nombre: "FPS",
      id: "FPS",
    },
    precio: 1200,
  },
  {
    id: "EFT",
    titulo: "Escape from Tarkov",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/FPS/02.jpg?raw=true`,
    categoria: {
      nombre: "FPS",
      id: "FPS",
    },
    precio: 4500,
  },
  {
    id: "RON",
    titulo: "Ready or Not",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/FPS/03.jpg?raw=true`,
    categoria: {
      nombre: "FPS",
      id: "FPS",
    },
    precio: 900,
  },
  {
    id: "RS",
    titulo: "Rainbow Six Extraction",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/FPS/04.jpg?raw=true`,
    categoria: {
      nombre: "FPS",
      id: "FPS",
    },
    precio: 3000,
  },
  {
    id: "AH",
    titulo: "Atomic Heart",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/FPS/05.jpg?raw=true`,
    categoria: {
      nombre: "FPS",
      id: "FPS",
    },
    precio: 4950,
  },
  {
    id: "CPUNK",
    titulo: "Cyberpunk",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/OpenWorld/01.jpg?raw=true`,
    categoria: {
      nombre: "Mundo abierto",
      id: "OpenWorld",
    },
    precio: 1800,
  },
  {
    id: "FC5",
    titulo: "Far Cry 5",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/OpenWorld/02.jpg?raw=true`,
    categoria: {
      nombre: "Mundo abierto",
      id: "OpenWorld",
    },
    precio: 2500,
  },
  {
    id: "RDD2",
    titulo: "Red Dead Redemption 2",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/OpenWorld/03.jpg?raw=true`,
    categoria: {
      nombre: "Mundo abierto",
      id: "OpenWorld",
    },
    precio: 890,
  },
  {
    id: "NMS",
    titulo: "No Man's Sky",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/OpenWorld/04.jpg?raw=true`,
    categoria: {
      nombre: "Mundo abierto",
      id: "OpenWorld",
    },
    precio: 500,
  },
  {
    id: "GTAV",
    titulo: "Grand Theft Auto V",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/OpenWorld/05.jpg?raw=true`,
    categoria: {
      nombre: "Mundo abierto",
      id: "OpenWorld",
    },
    precio: 1100,
  },
  {
    id: "MCRAFT",
    titulo: "Minecraft",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/OpenWorld/07.jpg?raw=true`,
    categoria: {
      nombre: "Mundo abierto",
      id: "OpenWorld",
    },
    precio: 250,
  },
  {
    id: "HZD",
    titulo: "Horizon Zero Dawn",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/OpenWorld/07.jpg?raw=true`,
    categoria: {
      nombre: "Mundo abierto",
      id: "OpenWorld",
    },
    precio: 3400,
  },
  {
    id: "TW3",
    titulo: "The Witcher 3: Wild Hunt",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/OpenWorld/08.jpg?raw=true`,
    categoria: {
      nombre: "Mundo abierto",
      id: "OpenWorld",
    },
    precio: 750,
  },
  {
    id: "ITT",
    titulo: "It Takes Two",
    imagen: `https://raw.githubusercontent.com/NeeHum/integrador-backend/main/src/assets/img/Adventure/01.jpg`,
    categoria: {
      nombre: "Aventura",
      id: "Adventure",
    },
    precio: 2400,
  },
  {
    id: "SMR",
    titulo: "Spider-Man Remastered",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/Adventure/02.jpg?raw=true`,
    categoria: {
      nombre: "Aventura",
      id: "Adventure",
    },
    precio: 5900,
  },
  {
    id: "SMMM",
    titulo: "Spider-Man: Miles Morales",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/Adventure/03.jpg?raw=true`,
    categoria: {
      nombre: "Aventura",
      id: "Adventure",
    },
    precio: 6000,
  },
  {
    id: "RE3",
    titulo: "Resident Evil 3",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/Adventure/04.jpg?raw=true`,
    categoria: {
      nombre: "Aventura",
      id: "Adventure",
    },
    precio: 2900,
  },
  {
    id: "GOWR",
    titulo: "God of War Ragnarök",
    imagen: `https://github.com/NeeHum/integrador-backend/blob/main/src/assets/img/Adventure/05.jpg?raw=true`,
    categoria: {
      nombre: "Aventura",
      id: "Adventure",
    },
    precio: 6000,
  },
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

// Ruta para crear un producto
app.post("/api/productos", async (req, res) => {
  try {
    const {
      id,
      titulo,
      imagen,
      categoria,
      precio
    } = req.body;

    // Crear un nuevo producto utilizando el modelo
    const newProduct = new Product({
      id,
      titulo,
      imagen,
      categoria,
      precio
    });

    // Guardar el producto en la base de datos
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error al crear un producto:", error);
    res.status(500).json({ error: "Error al crear un producto" });
  }
});

