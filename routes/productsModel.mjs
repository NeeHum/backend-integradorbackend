import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: String,
  titulo: String,
  imagen: String,
  categoria: {
    nombre: String,
    id: String,
  },
  precio: Number,
});

const Product = mongoose.model('Product', productSchema);

export { Product, productSchema };
