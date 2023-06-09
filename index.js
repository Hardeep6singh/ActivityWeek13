require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
var path = require('path');
const port = process.env.PORT || 8000


const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app = express()

// middleware for bodyparser
app.use(bodyParser.urlencoded({extended: false}))

//middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

//setup handlebars
// setup handlebars
app.engine(
    '.hbs',
    exphbs.engine(
        {
            extname: 'hbs',
            handlebars: allowInsecurePrototypeAccess(Handlebars),
        }
    )
)

app.set(
    'view engine',
    '.hbs'
)

// attempt to connect with DB
const connectDB = async()=>{
    try{
    const conn = await mongoose
    .connect(process.env.mongoDBUrl)
    .then(()=>console.log("mongo DB connected"));
    }
    catch(err){
    console.log(err)
    }
}
 


// Get profile routes
const user = require('./routes/api/user')

app.get('/', (req, res) => {
    res.render('form')
})

// actual routes
app.use('/api/user', user)

connectDB().then(()=>{
    app.listen(port, () => {
        console.log("listening for requests");}
        )
})