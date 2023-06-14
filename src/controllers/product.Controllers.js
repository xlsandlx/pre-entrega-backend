import { Product } from '../model/product.js'
import { products } from '../db/products.db.js'

export function getProducts (req, res) {
    const limit = req.query.limit

    if (!limit) {
        res.status(200).json({ products })
    } else if (limit <= 0 || limit > products.length) {
        return res.status(400).json({ message: 'El limite no es valido' })
    } else {
        const limitProducts = products.slice(0, limit);
        res.status(200).json({ limitProducts })
    }
}

export function getProductsById (req, res) {
    const { pid }= req.params
    const product = products.find((product) => product.id == pid)

    if (isNaN(pid)) {
        return res.status(400).json({ message: "El id debe ser numerico" })
    }

    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" })
    }

    res.status(200).json({ product })
}

export function createProduct (req, res) {
    const { title, description, code, price, stock, category, thumbnail } = req.body
    const productCodeFound = products.find((product) => product.code == code)

    if (!title || !description || !code || !price || !stock || !category || !thumbnail){
        return res.status(400).json({ message: "Faltan datos" })
    }
    
    if (productCodeFound) {
        res.status(400).json({ message: "Ya existe un producto con el codigo ingresado" })
    } else {
        const newProduct = new Product (title, description, code, price, stock, category, thumbnail)
        res.status(200).json({ message: "Producto agregado exitosamente" })
    }
}

export function updateProduct (req, res) {
    const { pid } = req.params
    const newData = req.body
    const update = products.find((product) => product.id == pid)

    if (update) {
        Object.assign(update, newData)
        res.status(200).json({ message: "Producto modificado exitosamente" })
    } else {
        res.status(404).json({ message: "Producto no encontrado." })
    }
}

export function deleteProduct (req, res) {
    const { pid } = req.params
    const indexProductDelete = products.findIndex((product) => product.id == pid)

    if (indexProductDelete !== -1) {
        products.splice(indexProductDelete, 1)
        res.status(200).json({ message: "Producto eliminado exitosamente" })
    } else {
        res.status(404).json({ message: "Producto no encontrado." });
    }
}