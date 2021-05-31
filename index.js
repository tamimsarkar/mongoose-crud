const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routes/todoHandler')

const app = express();
app.use(express.json());

//database connnection

mongoose.connect("mongodb://localhost/todos",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`mongodb connected`))
.catch(err => console.log(err.message))
//  app routes

app.use('/todo', todoHandler)

//  default error handling
function errorHandler (err, req, res, next){
    if(res.headerSent){
        return next(err)
    }else{
        res.status(500).json({error: err})
    }
}

app.listen(3000, () => {
    console.log(`app is running on port 3000`)
})