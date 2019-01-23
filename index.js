'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')
const app = express()
const port = process.env.PORT || 3001

const ProductCtrl = requiere('./controller/product')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())//usar archivos json 

app.get('/api/product', ProductCtrl.getProducts)

app.get('/api/product/:productId', (req, res )=>{
   

})

app.post('/api/product', (req, res)=>{
    console.log('POST/api/product')
    console.log (req.body)

    let product = new Product()
    product.name = req.body.name
    product.price = req.body.price
    product.picture =req.body.picture
    product.category = req.body.category
    product.description = req.body.description
    
    product.save((err, productStored)=>{
        if (err) res.status(500).send({message: 'Error al salvar en la base de datos:' +err})

        res.status(200).send({product: productStored})
    })

})

app.put ('/api/product/:productId',(req, res)=>{
    let productId = req.params.productId
    let update = req.body 

    Product.findByIdAndUpdate(productId, update,(err, productUpdate)=>{
        if (err) res.status(500).send({message: "Error al actualizar el producto " + err})          
        
        res.status(200).send({product: productUpdate})
    })
})

app.delete('/api/product/:productId',(req, res)=>{
    let productId = req.params.productId

    Product.findById(productId, (err, product)=>{
        if (err) res.status(500).send({message: "Error al borrar el producto " + err})        
        product.remove(err => {
            if (err) res.status(500).send({message: "Error al borrar el producto " + err})
            res.status(200).send({message: "El producto ha sido eliminado"})

        })
    })
})

mongoose.connect('mongodb://localhost:27017/shop',(err,res)=>{
    if(err)  {
        return console.log('Error al conectar a la base de datos:' +err)
    }
    console.log('conexion a la base de datos establecida...')
    
    app.listen(port, ()=>{
        console.log('Api  Rest corriendo en http://localhost:' + port)
    })

})
