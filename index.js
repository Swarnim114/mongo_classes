const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
require('dotenv').config();

// Corrected MongoDB connection string with URL-encoded password

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log("connection to DB failed", err);
});

const product_Schema = mongoose.Schema({
    product_name : {
        type : String,
        required:true
    },
    product_price : {
        type : String,
        required : true
    },
    isInStock : {
        type : Boolean,
        required : true
    },
    category : {
        type : String ,
        required : true
    }

});

const product_model = mongoose.model('product', product_Schema);
//create

app.post('/api/products' , async(req , res) => {
    const body = req.body
    const product = product_model.create({
        product_name : req.body.product_name,
        product_price : req.body.product_price,
        isInStock : req.body.isInStock,
        category : req.body.category
    })

    console.log(product);
    return res.status(201).json({message : "product created"});
})


app.get('/api/products', async(req , res) =>{
    const allProducts = await product_model.find({});
    return res.json(allProducts);
});


app.get('/api/products/:id', async(req , res) =>{
    const product_with_id = await product_model.findById(req.params.id);
    return res.json(product_with_id);
})

app.put('/api/products/:id', async(req , res) =>{
    const updated_product = await product_model.findByIdAndUpdate(req.params.id , req.body);
    return res.json(updated_product);
})

//delete a resource
app.delete('/api/products/:id', async(req , res) =>{
    const deleted_product = await product_model.findByIdAndDelete(req.params.id);
    return res.json(deleted_product);
})



app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
