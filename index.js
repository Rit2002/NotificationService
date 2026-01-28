const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');


// custom modules
const sendEmail = require('./services/email.service');
const ticketRoutes = require('./routes/ticket.routes');

const app = express();
env.config();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

ticketRoutes(app); // invoking ticket routes function

app.listen(process.env.PORT, async ()=>{
    console.log(`Server started at localhost:${process.env.PORT}`);

    // sendEmail(process.env.EMAIL, process.env.EMAIL_PASS);
    
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`Successfully Connected to mongoDB`);
        
    } catch (error) {
        console.log(error);      
    }
});