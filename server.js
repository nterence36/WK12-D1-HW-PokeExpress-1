const express = require("express");
const app = express();
const port = 3000;
const jsxEngine = require("jsx-view-engine");
const pokemon = require("./models/pokemon.js");

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine()); 

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!');
})

// Index route
app.get('/pokemon', (req, res) => {
    res.render('Index', {pokemon:pokemon})
})

// New - get the form to add new fruit
app.get('/pokemon/new', (req, res) => {
    res.render('New');
  })

  // Create
app.post('/pokemon', (req, res)=>{
    req.body.img = "http://img.pokemondb.net/artwork/" + req.body.name.toLowerCase()
    pokemon.push(req.body);
    console.log(pokemon);
    //res.send('data received');
    res.redirect('/pokemon');  // Send the user back to /fruits
  });
  
//Show route
app.get('/pokemon/:id', (req, res) => {
    res.render("Show", {pokemon:pokemon[req.params.id]});
})

app.listen(port,() => {
    console.log('listening on port' , port);
});