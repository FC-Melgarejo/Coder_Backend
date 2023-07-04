const express = require("express");
const app = express();
const ProductManager = require("../components/ProductManager");
const carrito = require('./carrito');
const fs = require('fs/promises');


const products = new ProductManager();
const carritos = new carrito();

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const allProducts = await products.readProducts();
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(allProducts);
    let productLimit = allProducts.slice(0, limit);
    res.send(productLimit);
  } catch (e) {
    res.status(500).send("Error al obtener los productos");
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const allProducts = await products.readProducts();
    let id = parseInt(req.params.id);
    let productById = allProducts.find((p) => p.id === id);
    if (!productById)
      return res.status(404).send("No se encuentra este producto");
    res.send(productById);
  } catch (e) {
    res.status(500).send("Error al obtener el producto");
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    await products.updateProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    res.send("Producto actualizado");
  } catch (e) {
    res.status(500).send("Error al actualizar el producto");
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await products.deleteProductById(id);
    res.send("Producto eliminado correctamente");
  } catch (e) {
    res.status(500).send("Error al eliminar el producto");
  }
});

app.use("/api/products", productRouter);

const cartRouter = express.Router();

cartRouter.get("/:id", async (req, res) => {
try {
    const id = parseInt(req.params.id);
    const cart = await carritos.getCartById(id);
    if (!cart) return res.status(400).send("Carrito no existe");
    res.send(cart);
} catch (e) {
    res.status(500).send("Error al llamar al carrito");
  }
});

cartRouter.post("/:id/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.params.pid);
    await carritos.addProductToCart(cartId, productId);
    res.send("Producto agregado al carrito correctamente");
  } catch (e) {
    res.status(500).send("Error al agregar producto al carrito");
  }
});

app.use("/api/carrito", cartRouter);

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
