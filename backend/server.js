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

app.post('/api/login', (req, res) => {
    const { user, pass } = req.body;
    db.query('SELECT * FROM usuarios WHERE username = ? AND contrasena = ?', [user, pass], (err, result) => {
        if (err) {
            console.error('Error al realizar la consulta:', err);
            res.status(500).send('Error interno del servidor');
        }
        if (result.length > 0) {
            res.status(200).send('Login exitoso');
        } else {
            res.status(401).send('Credenciales incorrectas');
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

//obtener el username de usuarios
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT username FROM usuarios', (err, result) => {
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


app.listen(PORT, () => {
    console.log('Servidor backend corriendo en http://localhost:${PORT}');
})  