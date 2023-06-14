import { Router } from 'express'
import { createCart, getAllCarts } from '../controllers/cart.Controller.js'
import { getCartById } from '../controllers/cart.Controller.js'
import { addProductToCart } from '../controllers/cart.Controller.js'
import { deleteProductInCart } from '../controllers/cart.Controller.js'

const router = Router()

router.post('/', createCart)

router.get('/', getAllCarts)

router.get('/:cid',getCartById)

router.post('/:cid/product/:pid', addProductToCart)

router.delete('/:cid/product/:pid', deleteProductInCart)



export default router