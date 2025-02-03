const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const Joi = require('joi');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
require('./data.js')();
require('./validation.js')();
const db = get_db();

app.post('/api/v1/mozi', (req, res) => {
    const { cim, mufaj, kategoria, rendezo } = req.body;
    console.log(req.body);
    const { error } = inputValidations(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    db.run(`INSERT INTO filmek (cim, mufaj, kategoria, rendezo) VALUES (?, ?, ?, ?)`,
    [cim, mufaj, kategoria, rendezo],
    function (err) {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message: 'Sikeres validácó', id: this.lastID, cim, mufaj, kategoria, rendezo});
        }
    });
});

app.get('/api/v1/mozi', (req, res) => {
    db.all(`SELECT * FROM filmek`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.get('/api/v1/mozi/:id', (req, res) => {
    const { id } = req.params;
    db.all(`SELECT * FROM filmek WHERE id = ?`, [id], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.put('/api/v1/mozi/:id', (req, res) => {
    const { id } = req.params;
    const { cim, mufaj, kategoria, rendezo } = req.body;
    const { error } = inputValidations(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    db.run(`UPDATE filmek SET cim = ?, mufaj = ?, kategoria = ?, rendezo = ? WHERE id = ?`,
    [cim, mufaj, kategoria, rendezo, id],
    function (err) {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message: 'Az adatok frissítése megtörtént!', id, cim, mufaj, kategoria, rendezo});
        }
    });
});

app.delete('/api/v1/mozi/:id', (req, res) => {
    const { id } = req.params;
    const {cim, rendezo} = req.body;
    db.run(`DELETE FROM filmek WHERE id = ?`, [id],
    function (err) {
        if (err) {
            res.status(500).json({ err: err.message});
        } else {
            res.json({ message: `A ${cim} címü és ${rendezo} rendező által készített film adatainak a törlése megtörtént.`});
        }
    });
});

app.listen(port, () => {
    console.log(`A szerver fut  ${port}-es számú porton.`);
});