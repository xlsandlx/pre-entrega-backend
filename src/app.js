import express from 'express'
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('ok'))
app.use('/products', productsRouter)
app.use('/carts', cartsRouter)

app.listen(8080, () => console.log('server up'))