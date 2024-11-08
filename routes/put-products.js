import filesystem from 'fs'
import express, {Router} from 'express'
import ResponseBuilder from '../builder/response.builder.js'
import { NOTFOUND } from 'dns'
// import asd from './public/products.json'

const productCutRouter = Router()
productCutRouter.use(express.json())
const fileJSON = JSON.parse(await filesystem.promises.readFile('./public/products.json', {encoding:'utf-8'}))
const productsJSON = fileJSON.products

productCutRouter.put('/:product_id', async (req, res) => {
    const { name, price, category, stock } = req.body
    const {product_id} = req.params
    const findProduct = productsJSON.findIndex((products) => Number(product_id) === products.id) 
    const response = new ResponseBuilder()        
    try{

        
        if (findProduct === -1){
            response
            .setStatus(404)
            .setOk(false)
            .setMessage(`The property it's invalid`)
            .build()
            return res.status(404).json(response)
        }
        
            const elIndicado = productsJSON[findProduct]

            const arrerr = []

            for(property in req.body){
                if (req.body.hasOwnProperty(property)) {
                    req.body[property] = updates[property]; // Update product property if it exists
                }
            }
            const updates = {
                price: 120,
                stock: 15
            };
            response
            .setStatus(200)
            .setOk(false)
            .setPayload( elIndicado )
            .setMessage('El producto ha sido modificado')
            .build()
            return res.status(200).json(response)
    } catch(error){
        console.error("ERROR", error)
        return res.send( productsJSON[findProduct] )
    }
})


export default productCutRouter


// for (let propiedad in req.body) {
//     if (!propiedades_permitidas[propiedad]) {
//         const response = new ResponseBuilder()
//         .setOk(false)
//         .setStatus(400)
//         .setMessage(`La propiedad '${propiedad}' no es válida`)
//         .setPayload({ product: null })



//         .build()
//         return res.status(400).json(response)
//     }