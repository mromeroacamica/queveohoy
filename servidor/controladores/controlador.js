function hola() {
    console.log('hola');
}

let con = require('../lib/conexionbd');

con.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + con.threadId);
});

function buscarTodasPeliculas(req, res) {
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaa', req.query)
    let query = req.query;
    let sql;
    let select = 'select * ';
    let busqueda;

    // console.log(query.genero)
    // console.log(query.anio)
    // console.log(query.titulo)
    if (query.genero && query.anio && query.titulo) {
        busqueda = 'from pelicula where genero_id = "' + query.genero + '" and anio ="' + query.anio + '" and titulo like "%' + query.titulo + '%"';
        sql = select + busqueda;

    } else if (query.genero && query.anio) {
        busqueda = 'from pelicula where genero_id = "' + query.genero + '" and anio ="' + query.anio + '"';
        sql = select + busqueda;

    } else if (query.genero && query.titulo) {
        busqueda = 'from pelicula where genero_id = "' + query.genero + '" and titulo like "%' + query.titulo + '%"';
        sql = select + busqueda;

    } else if (query.genero) {
        busqueda = 'from pelicula where genero_id = "' + query.genero + '"';
        sql = select + busqueda;

    } else if (query.anio && query.titulo) {
        busqueda = 'from pelicula where anio ="' + query.anio + '" and titulo like "%' + query.titulo + '%"';
        sql = select + busqueda;

    } else if (query.anio) {
        busqueda = 'from pelicula where anio ="' + query.anio + '"';
        sql = select + busqueda;

    } else if (query.titulo) {
        busqueda = 'from pelicula where titulo like "%' + query.titulo + '%"';
        sql = select + busqueda;

    } else {
        busqueda = 'from pelicula';
        sql = select + 'from pelicula';

    }

    let sql2;

    switch (query.columna_orden) {
        case 'titulo':
            sql2 = ' ORDER by titulo';
            break;
        case 'anio':
            sql2 = ' ORDER by anio desc';
            break;
        case 'puntuacion':
            sql2 = ' ORDER by puntuacion desc';
            break;
        default:
            sql2 = ' ORDER by titulo';


    }
    let cantidad = query.cantidad;
    let limiteInferior = (query.pagina - 1) * 52;
    let limite = ' limit ' + limiteInferior + ',' + 52;
    // console.log(limite)

    let sql3 = sql + sql2 + limite;
    let sql4 = 'select count(id) AS count ' + busqueda
    let cantidadPeliculasTotal;
    // console.log('cccccccccccccc',busqueda)

    new Promise((resolve, reject) => {

        con.query(sql4, function (err, results, fields) {
            // console.log('gggggggggg', sql4)
            if (err) reject(err);
            resolve(results)
        })
    }).then(response => {
        cantidadPeliculasTotal = response[0];
        new Promise((resolve, reject) => {
            con.query(sql3, function (err, results, fields) {
                // console.log('bbbbbbbbbbbbbbbbbbbb', sql3)
                if (err) reject(err);
                resolve(results)
            })
        }).then(response => {
            let respuestaEnviar = {
                peliculas: response,
                total: cantidadPeliculasTotal.count
            }
            // console.log('llllllllllllll',respuestaEnviar.total);
            res.send(respuestaEnviar)
        })



    });


};

function buscarTodosGeneros(req, res) {
    let sql = 'select * from genero';
    con.query(sql, function (err, results, fields) {
        if (err) {
            console.log('hubo un error');
            return res.status(404).send('hubo error');
        }
        let response = {
            generos: results
        }
        // console.log(response)
        res.send(response)
        // res.send(JSON.stringify(response));

    })
};

function informacionPelicula(req, res) {
    let idPelicula = req.params.id;

    new Promise((resolve, reject) => {

        let sql = 'select * from pelicula where id = ' + idPelicula;
        con.query(sql, function (err, results, fields) {
            if (err) reject(err);
            resolve(results)

        })

    }).then(response => {

        let peliculaBuscada = {
            pelicula: response[0],
            actores: 0
        };
        new Promise((resolve, reject) => {
            let sql2 = 'select actor_pelicula.actor_id, actor_pelicula.pelicula_id, actor.nombre from actor_pelicula, actor where actor_pelicula.actor_id = actor.id AND actor_pelicula.pelicula_id = ' + idPelicula;
            con.query(sql2, function (err, results, fields) {
                if (err) reject(err);
                resolve(results)
            })

        }).then(response => {
            console.log(response)
            peliculaBuscada.actores = response;
            console.log('ggggggggggggggg', peliculaBuscada.actores)

            res.send(peliculaBuscada);
        })

        // console.log('aaaaaaaaaaaaaa',response)

    })
};



module.exports = {
    hola,
    buscarTodasPeliculas,
    buscarTodosGeneros,
    informacionPelicula
}; 