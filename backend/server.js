const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "globalstoredb"
})

app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let sql = "SELECT * FROM users WHERE username = ? AND contrasena = ?"
    const values = [

    ]
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err) return res.json('Error');
        if (data.length > 0) {
            return res.jason('Login bien');
        }
        else {
            return res.json('Login mal');
        }
    })
});

app.listen(80, () => {
    console.log('Server started');
})  