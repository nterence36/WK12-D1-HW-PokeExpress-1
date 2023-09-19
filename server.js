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

app.get('/pokemon', (req, res) => {
    res.render('Index')
})


app.listen(port,() => {
    console.log('listening on port' , port);
});