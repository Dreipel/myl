
// 3rd Party Modules 
const express = require('express'); 
require('dotenv/config'); 
  
// Local Modules 
const myRoute = require('./routes/myRoute.js'); 
const userRoute = require('./routes/usersRoute.js'); 
const editionRoute = require('./routes/editionsRoute.js'); 
const myCardsRoute = require('./routes/myCardsRoute.js'); 
const { connect } = require('./connection/connection.js');

  
// Server Initialization 
const app = express(); 
const PORT = process.env.PORT; 
  
// Middlewares 
app.use(express.json()); 
  
// Routes will be written here 
app.use('/route', myRoute);  
app.use('/User', userRoute); 
app.use('/Edition', editionRoute);
app.use('/MyCards',myCardsRoute);

connect();
  
// Server Listen Along with Database  
// connection(in case of data persistence) 
app.listen(PORT, (error) =>{ 
    if(!error){
        console.log("Server is Successfully Running,  and App is listening on port "+ PORT) 
     }else 
        console.log("Error occurred, server can't start", error); 
    } 
);