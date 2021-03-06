//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require('./controladores/controlador');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/peliculas/recomendacion', (req, res) => controlador.recomendarPelicula(req, res));

app.get('/peliculas', (req, res) => controlador.buscarTodasPeliculas(req, res));

app.get('/generos', (req, res) => controlador.buscarTodosGeneros(req, res));

app.get('/peliculas/:id', (req, res) => controlador.informacionPelicula(req, res));




//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

