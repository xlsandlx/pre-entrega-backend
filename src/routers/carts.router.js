import { Router } from 'express'

const router = Router()

const carts = []

router.post('/', (req, res) => {
    const newCart = {
        id: carts.length + 1,
        products: []
    };
    carts.push(newCart);
    res.status(200).json({ message: "Carrito agregado exitosamente" });
});

router.get('/:cid', (req, res) => {
    const id = req.params.cid
    if (isNaN(id)) return res.status(400).json({ message: "El id debe ser numerico" })
    const cart = carts.find((cart) => cart.id == id)
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" })
    res.status(200).json({ cart })
})

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid
    const productId = parseInt(req.params.pid)
    const cart = carts.find((cart) => cart.id == cartId)
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" })
    const existingProduct = cart.products.find((item) => item.product == productId)
    if (existingProduct) {
        existingProduct.quantity++;
    } else cart.products.push({ product: productId, quantity: 1 })
    res.status(200).json({ message: "Producto agregado al carrito exitosamente" })
})

router.delete('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid
    const productId = parseInt(req.params.pid)
    const cart = carts.find((cart) => cart.id == cartId)
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" })
    const updatedProducts = cart.products.filter((item) => item.product != productId)
    if (updatedProducts.length === cart.products.length) return res.status(404).json({ message: "Producto no encontrado en el carrito" })
    cart.products = updatedProducts
    res.status(200).json({ message: "Producto eliminado del carrito exitosamente" })
})



export default router