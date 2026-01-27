const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');


const app = express();
env.config();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.listen(process.env.PORT, async ()=>{
    console.log(`Server started at localhost:${process.env.PORT}`);
    
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`Successfully Connected to mongoDB`);
        
    } catch (error) {
        console.log(error);      
    }
});