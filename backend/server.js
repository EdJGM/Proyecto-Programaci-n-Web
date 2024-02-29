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
    if (err){
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.post('/api/login', (req, res) => {
    const { user, pass } = req.body;
    db.query('SELECT * FROM usuarios WHERE usuarios = ? AND constrasena = ?', [user, pass], (err, result) => {
        if (err){
            console.error('Error al realizar la consulta:', err);
            res.status(500).send('Error interno del servidor');
        }
        if (result.length > 0){
            res.status(200).send('Login exitoso');
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    });
});

app.listen(PORT, () => {
    console.log('Servidor backend corriendo en http://localhost:${PORT}');
})  