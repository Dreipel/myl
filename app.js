
// 3rd Party Modules 
const express = require('express');
const cors = require("cors");
const winston = require('winston');
require('dotenv/config'); 
  
// Local Modules 
// const myRoute = require('./routes/myRoute.js');
const userRoute = require('./routes/usersRoute.js');
const editionRoute = require('./routes/editionsRoute.js');
const myCardsRoute = require('./routes/myCardsRoute.js');
const cardRoute = require('./routes/cardsRoute.js');
const formatRoute = require('./routes/formatsRoute.js');
const raceRoute = require('./routes/racesRoute.js');
const typeRoute = require('./routes/typesRoute.js');
const { connect } = require('./connection/connection.js');

// Server Initialization 
const app = express(); 
const PORT = process.env.PORT; 
  
// Middlewares 
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb'}));
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000','http://localhost:3001', 'https://myl.jorgealmonacid.com'] // Whitelist the domains you want to allow
};
app.use(cors(corsOptions)); 
  
// Routes will be written here 
// app.use('/route', myRoute);  
app.use('/User', userRoute); 
app.use('/Edition', editionRoute);
app.use('/MyCards',myCardsRoute);
app.use('/Cards',cardRoute);
app.use('/Formats',formatRoute);
app.use('/Races',raceRoute);
app.use('/Types',typeRoute);

connect();

process.on('uncaughtException', function (err) {
    if (err) {
        console.log("caughtException but no error msg" + err.stack);
        process.exit(1);
    }
});
  
// Server Listen Along with Database  
// connection(in case of data persistence) 
app.listen(PORT, (error) =>{ 
    if(!error){
        console.log("Server is Successfully Running,  and App is listening on port "+ PORT) 
     }else 
        console.log("Error occurred, server can't start", error); 
    } 
);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or higher to `error.log`
        //   (i.e., error, fatal, but not other levels)
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        //
        // - Write all logs with importance level of `info` or higher to `combined.log`
        //   (i.e., fatal, error, warn, and info, but not trace)
        //
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
