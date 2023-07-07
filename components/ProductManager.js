const fs = require('fs/promises');

class ProductManager {
  constructor() {
    this.path = './../src/Data/product.json'
    
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  async saveProducts() {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2) + '\n');
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.products.length + 1,
    };
    this.products.push(newProduct);

    await this.saveProducts();
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
    let products = await this.readProducts();
    let product = products.find((p) => p.id === id);
    return product ? product : null;
  };

  deleteProductById = async (id) => {
    let eliminar = await this.readProducts();
    let productFilter = eliminar.filter((p) => p.id !== id);
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

  findIndex(predicate) {
    return this.products.findIndex(predicate);
  }
}

module.exports = ProductManager;




