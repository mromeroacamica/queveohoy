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
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa', req.query)
    let query = req.query;
    let sql;
    // if(req.query){
    //     let sql= 'select * from pelicula where anio = '+ query.anio + 'and genero = '+query.genero+ 'and titulo like %'+query.titulo+'%';
    // }
    console.log(query.genero)
    console.log(query.anio)
    console.log(query.titulo)
    if (query.genero && query.anio && query.titulo) {

        sql = 'select * from pelicula where genero_id = "' + query.genero + '" and anio ="' + query.anio + '" and titulo like "%' + query.titulo + '%"';

    } else if (query.genero && query.anio) {
        sql = 'select * from pelicula where genero_id = "' + query.genero + '" and anio ="' + query.anio + '"';

    } else if (query.genero && query.titulo) {
        sql = 'select * from pelicula where genero_id = "' + query.genero + '" and titulo like "%' + query.titulo + '%"';

    } else if (query.genero) {
        sql = 'select * from pelicula where genero_id = "' + query.genero + '"';

    } else if (query.anio && query.titulo) {
        sql = 'select * from pelicula where anio ="' + query.anio + '" and titulo like "%' + query.titulo + '%"';

    } else if (query.anio) {

        sql = 'select * from pelicula where anio ="' + query.anio + '"';
    }else if(query.titulo){
        sql = 'select * from pelicula where titulo like "%' + query.titulo + '%"';

    } else {
        sql = 'select * from pelicula';

    }


    con.query(sql, function (err, results, fields) {
        console.log('bbbbbbbbbbbbbbbbbbbb', sql)
        if (err) {
            console.log('hubo un error');
            return res.status(404).send('hubo error');
        }
        let response = {
            peliculas: results
        }

        // console.log(response)
        res.send(response)
        // res.send(JSON.stringify(response));

    })
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




module.exports = {
    hola,
    buscarTodasPeliculas,
    buscarTodosGeneros
}; 