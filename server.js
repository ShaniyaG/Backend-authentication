const express = require('express');
const dotenv = require('dotenv').config();
const logger = require('./middlewares/logger');
const morgan = require('morgan');
const colors = require('colors');
const connectDb = require('./config/db');
const errorHandler = require('./middlewares/error');
const cookieParser = require('cookie-parser');

// routes files

const bootcamp = require('./routes/bootcamps');
const auth = require('./routes/auth');
// Connect to Database
connectDb();


const app = express();
// dotenv.config({path:'./config/config.env'})

PORT = process.env.PORT || 3001

// Dev Logiing middlewares
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

// app.use(logger);
app.use(express.json());
// cookie parser
app.use(cookieParser())
// Mount routers
app.use('/api/v1/bootcamps',bootcamp);

app.use('/api/v1/auth',auth);
// error Handler
app.use(errorHandler);

const server = app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`.yellow.bold)
    })

// Handle Unhandles promises

process.on('unhandledRejection' , (err,promise)=>{
    console.log(`Error: ${err.message}`.red);
    // Close Server and exit process
    server.close(()=>process.exit(1));

})