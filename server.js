// Add dotenv
require('dotenv').config()

const express = require("express");
const app = express();
const port = 3000;
const jsxEngine = require("jsx-view-engine");
const mongoose = require('mongoose')

const methodOverride = require('method-override')
// connect to Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const Pokemon = require("./models/pokemon.js");

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine()); 

//near the top, around other app.use() calls (middleware: A code that sit between request and respond)
app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'))

app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!');
})

app.get('/pokemon/seed', async (req, res) => {
   await Pokemon.create(
        {name: 'wartortle',
        img: 'http://img.pokemondb.net/artwork/wartortle'}
    ).then(res.redirect('/pokemon')).catch(console.log('Something wrong'))
    
})

// Index route
app.get('/pokemon', async (req, res) => {
    try {
        const pokemon = await Pokemon.find()
         res.render('Index', {pokemon:pokemon})
    } catch(error) {
        console.log(error)
    }
})

// New - get the form to add new 
app.get('/pokemon/new', (req, res) => {
    res.render('New');
  })

// Delete Route
app.delete('/pokemon/:id', async (req, res)=>{
    try {
        await Pokemon.findByIdAndRemove(req.params.id)
        res.redirect('/pokemon')
    } catch(error) {
        console.error(error);
      }
    })


// Update
app.put("/pokemon/:id",  async (req, res) => {
    try {
      
       await Pokemon.findByIdAndUpdate(req.params.id, req.body)
  
      res.redirect("/pokemon")
  
    } catch(error) {
      console.log(error)
    }
  })

app.post('/pokemon/', async (req, res)=> {
    try {
        req.body.img = "http://img.pokemondb.net/artwork/" + req.body.name.toLowerCase()
        await Pokemon.create(req.body)
        res.redirect("/pokemon")
    } catch (error){
    console.log(error)
}})

//Show route
app.get("/pokemon/:id", async (req, res) => {

    try {
      const pokemon = await Pokemon.findById(req.params.id)
  
      res.render("Show", {pokemon: pokemon})
    } catch(error) {
      console.log(error)
    }
  })
  app.listen(3000, () => {
    console.log('listening')
})
