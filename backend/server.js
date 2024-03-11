const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "globalstoredb"
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// hacer login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM usuarios WHERE username = ? AND contrasena = ?', [username, password], (err, result) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            res.status(500).send('Error interno del servidor');
        }

        if (result.length > 0) {
            const user = result[0];
            res.status(200).json({ message: 'Login exitoso', isAdmin: user.isAdmin });
        } else {
            res.status(401).send('Usuario no existe');
        }
    });
});

// Obtener todos los productos
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM productos', (err, result) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            res.status(500).send('Error interno del servidor');
        }
        res.status(200).send(result);
    });
});

//obtener producto por su id
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM productos WHERE idProducto = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            res.status(500).send('Error interno del servidor');
        }
        res.status(200).send(result);
    });
});

//obtener el username y email de usuarios
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT username, email FROM usuarios', (err, result) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            res.status(500).send('Error interno del servidor');
        }
        res.status(200).send(result);
    });
});

// join para obtener el nombre de la categoria de cada producto
app.get('/api/products/join/:categoria', (req, res) => {
    const categoria = req.params.categoria;
    db.query('SELECT productos.*, categorias.nombreC AS categoria FROM productos INNER JOIN categorias ON productos.idCategoria = categorias.idCategoria WHERE categorias.nombreC = ?', [categoria], (err, result) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            res.status(500).send('Error interno del servidor');
        }
        res.status(200).send(result);
    });
});

// registrar un nuevo usuario
app.post('/api/register', (req, res) => {
    const { user, name, lastname, date, email, password } = req.body;

    const query = 'INSERT INTO usuarios (idUsuario, username, nombre, apellido, fNacimiento, email, contrasena) VALUES (NULL, ?, ?, ?, ?, ?, ?)';
    const values = [user, name, lastname, date, email, password];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            res.status(200).send('Registro exitoso');
        }
    });
});

// buscar productos por nombre
app.get('/api/productos/search/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    db.query('SELECT * FROM productos WHERE nombreP LIKE ?', ['%' + nombre + '%'], (err, result) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            res.status(500).send('Error interno del servidor');
        }
        res.status(200).send(result);
    });
});

// obtener los productos de una categoria
app.get('/api/categorias/:nombrec/productos', (req, res) => {
    const nombrec = req.params.nombrec;
    db.query('SELECT * FROM productos WHERE idCategoria = (SELECT idCategoria FROM categorias WHERE nombreC = ?)', [nombrec], (err, result) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            res.status(500).send('Error interno del servidor');
        }
        res.status(200).send(result);
    });
});

// guardar datos de venta, donde tengo: idVenta(primary key, auto), nrTarjeta, nombre, fechaExp, cvc
app.post('/api/venta', (req, res) => {
    const { nrTarjeta, nombre, fechaExp, cvc } = req.body;
    const query = 'INSERT INTO ventas (idVenta, nrTarjeta, nombre, fechaExp, cvc) VALUES (NULL, ?, ?, ?, ?)';
    const values = [nrTarjeta, nombre, fechaExp, cvc];
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            res.status(200).send('Venta exitosa');
        }
    });
});


app.listen(PORT, () => {
    console.log('Servidor backend corriendo en http://localhost:${PORT}');
})  