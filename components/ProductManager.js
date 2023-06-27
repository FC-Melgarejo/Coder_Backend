const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  addProduct(product) {
    return new Promise((resolve, reject) => {
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        return reject("Error: Todos los campos son obligatorios.");
      }

      const existingProduct = this.products.find((p) => p.code === product.code);
      if (existingProduct) {
        return reject("Error: El código del producto ya existe.");
      }

      product.id = this.products.length + 1;
      this.products.push(product);

      this.guardarProductos()
        .then(() => {
          resolve("Producto agregado correctamente.");
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          console.error('Error al leer los productos:', err);
          return reject(err);
        }
        if (data === '') {
          return resolve([]);
        }
        const products = JSON.parse(data);
        return resolve(products);
      });
    });
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      this.getProducts()
        .then((products) => {
          const product = products.find((product) => product.id === id);
          resolve(product);
        })
        .catch((e) => {
          console.log('Error al obtener el producto:', e);
          reject(e);
        });
    });
  }

  updateProduct(id, updateProduct) {
    return new Promise((resolve, reject) => {
      this.getProducts()
        .then((products) => {
          const productIndex = products.findIndex((product) => product.id === id);

          if (productIndex === -1) {
            return reject();
          }

          products[productIndex].title = updateProduct.title;
          products[productIndex].description = updateProduct.description;
          products[productIndex].price = updateProduct.price;
          products[productIndex].thumbnail = updateProduct.thumbnail;
          products[productIndex].code = updateProduct.code;
          products[productIndex].stock = updateProduct.stock;

          this.guardarProductos()
            .then(() => {
              resolve('Producto actualizado');
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((e) => {
          console.log('Error al obtener el producto:', e);
          reject(e);
        });
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const productIndex = this.products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        return reject('Producto no encontrado');
      }

      this.products.splice(productIndex, 1);

      this.guardarProductos()
        .then(() => {
          resolve('Producto eliminado');
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  leerProductos() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      if (data === '') {
        console.log(data);
        return [];
      }
      return JSON.parse(data);
    } catch (err) {
      console.error('Error al leer los productos:', err);
      return [];
    }
  }

  guardarProductos() {
    return new Promise((resolve, reject) => {
      try {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFile(this.path, data, 'utf-8', (err) => {
          if (err) {
            console.log('Error al guardar los productos');
            reject(err);
          } else {
            console.log('Productos guardados correctamente');
            resolve();
          }
        });
      } catch (err) {
        console.log('Error al guardar los productos');
        reject(err);
      }
    });
  }
}

module.exports = ProductManager;

