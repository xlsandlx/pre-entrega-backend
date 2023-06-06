import { Router } from 'express'

const router = Router()

const products = [
    { id: 1, title: "producto prueba 1", description: "Este es un producto prueba 1", code: "0001", price: 200, status: true, stock: 25, category: "categoria de prueba", thumbnail: "Sin imagen" },
    { id: 2, title: "producto prueba 2", description: "Este es un producto prueba 2", code: "0002", price: 200, status: true, stock: 25, category: "categoria de prueba", thumbnail: "Sin imagen" }
]

router.get('/', (req, res) => {
    const limit = req.query.limit
    if (!limit) {
        res.status(200).json({ products })
    } else if (limit <= 0 || limit > products.length) {
        return res.status(400).json({ message: 'El limite no es valido' })
    } else {
        const limitProducts = products.slice(0, limit);
        res.status(200).json({ limitProducts })
    }
})

router.get('/:pid', (req, res) => {
    const id = req.params.pid
    if (isNaN(id)) return res.status(400).json({ message: "El id debe ser numerico" })
    const product = products.find((product) => product.id == id)
    if (!product) return res.status(404).json({ message: "Producto no encontrado" })
    res.status(200).json({ product })
})

router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnail } = req.body
    if (!title || !description || !code || !price || !stock || !category || !thumbnail) return res.status(400).json({ message: "Faltan datos" })
    const productCodeFound = products.find((product) => product.code == code)
    if (productCodeFound) {
        res.status(400).json({ message: "Ya existe un producto con el codigo ingresado" })
    } else {
        const newProduct = {
            id: products.length + 1,
            title: title,
            description: description,
            code: code,
            price: price,
            status: true,
            stock: stock,
            category: category,
            thumbnail: thumbnail,
        };
        products.push(newProduct);
        res.status(200).json({ message: "Producto agregado exitosamente" })
    }
})

router.put('/:pid', (req, res) => {
    const id = req.params.pid
    const newData = req.body

    const update = products.find((product) => product.id == id)
    if (update) {
        Object.assign(update, newData)
        res.status(200).json({ message: "Producto modificado exitosamente" })
    } else res.status(404).json({ message: "Producto no encontrado." })
})

router.delete('/:pid', (req, res) => {
    const id = req.params.pid

    const indexProductDelete = products.findIndex((product) => product.id == id)
    if (indexProductDelete !== -1) {
        products.splice(indexProductDelete, 1)
        res.status(200).json({ message: "Producto eliminado exitosamente" })
    } else {
        res.status(404).json({ message: "Producto no encontrado." });
    }
});


export default router