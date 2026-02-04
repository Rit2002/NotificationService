const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');


// custom modules
const cron = require('./crons/cron');
const ticketRoutes = require('./routes/ticket.routes');

const app = express();
env.config();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

ticketRoutes(app); // invoking ticket routes function

app.listen(process.env.PORT, async ()=>{
    console.log(`Server started at localhost:${process.env.PORT}`);

    cron.mailerCron();
    
    try {
        if(process.env.NODE_ENV == 'production') {
            await mongoose.connect(process.env.PROD_DB_URL);
            console.log(`Successfully Connected to mongoDB Atlas`);
        }
        else{
            await mongoose.connect(process.env.DB_URL);
            console.log(`Successfully Connected to mongoDB Compass`);
        }
        
    } catch (error) {
        console.log(error);      
    }
});