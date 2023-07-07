const fs = require('fs/promises');

class ProductManager {
  constructor() {
    this.path = './product.json';
    this.products = [];
  }

  static id = 0;

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;

    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    };
    this.products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2) + '\n');
  };

  readProducts = async () => {
    let prod = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(prod);
  };

  getProducts = async () => {
    let res = await this.readProducts();
    console.log(res);
  };

  getProductById = async (id) => {
    let devolver = await this.readProducts();
    if (!devolver.find((p) => p.id === id)) {
      console.log('Producto no encontrado');
    } else {
      console.log(devolver.find((p) => p.id === id));
    }
  };

  deleteProductById = async (id) => {
    let eliminar = await this.readProducts();
    let productFilter = eliminar.filter((p) => p.id != id);
    await fs.writeFile(this.path, JSON.stringify(productFilter, null, 2) + '\n');
    console.log('Producto Eliminado');
  };

  updateProduct = async ({ id, ...product }) => {
    await this.deleteProductById(id);
    let productOld = await this.readProducts();
    let productReemplazado = [
      { id, ...product },
      ...productOld,
    ];
    await fs.writeFile(this.path, JSON.stringify(productReemplazado, null, 2) + '\n');
  };
}

module.exports = ProductManager

