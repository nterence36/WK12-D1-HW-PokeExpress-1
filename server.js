const express = require("express");
const app = express();
const port = 3000;
const jsxEngine = require("jsx-view-engine");
const pokemon = require("./models/pokemon.js");

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine()); 

app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!');
})

// Index route
app.get('/pokemon', (req, res) => {
    res.render('Index', {pokemon:pokemon})
})

//Show route
app.get('/pokemon/:id', (req, res) => {
    res.render("Show", {pokemon:pokemon[req.params.id]});
})

app.listen(port,() => {
    console.log('listening on port' , port);
});