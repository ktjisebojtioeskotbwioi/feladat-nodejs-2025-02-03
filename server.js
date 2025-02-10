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

//filmek
app.post('/api/v1/mozi/filmek', (req, res) => {
    const { cim, mufaj, kategoria, rendezo } = req.body;
    console.log(req.body);
    const { error } = filmValidation(req.body);
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

app.get('/api/v1/mozi/filmek', (req, res) => {
    db.all(`SELECT * FROM filmek`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.get('/api/v1/mozi/filmek/:id', (req, res) => {
    const { id } = req.params;
    db.all(`SELECT * FROM filmek WHERE id = ?`, [id], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.put('/api/v1/mozi/filmek/:id', (req, res) => {
    const { id } = req.params;
    const { cim, mufaj, kategoria, rendezo } = req.body;
    const { error } = filmValidation(req.body);
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

app.delete('/api/v1/mozi/filmek/:id', (req, res) => {
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









//vetites
app.post('/api/v1/mozi/vetites', (req, res) => {
    const { Film, Idopont, Terem} = req.body;
    console.log(req.body);
    const { error } = vetitesValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    db.run(`INSERT INTO vetites (Film, Idopont, Terem) VALUES (?, ?, ?)`,
    [Film, Idopont, Terem],
    function (err) {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message: 'Sikeres validácó', id: this.lastID, Film, Idopont, Terem});
        }
    });
});

app.get('/api/v1/mozi/vetites', (req, res) => {
    db.all(`SELECT * FROM vetites`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.get('/api/v1/mozi/vetites/:id', (req, res) => {
    const { id } = req.params;
    db.all(`SELECT * FROM vetites WHERE id = ?`, [id], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.put('/api/v1/mozi/vetites/:id', (req, res) => {
    const { id } = req.params;
    const { Film, Idopont, Terem } = req.body;
    const { error } = vetitesValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    db.run(`UPDATE vetites SET Film = ?, Idopont = ?, Terem = ? WHERE id = ?`,
    [Film, Idopont, Terem],
    function (err) {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message: 'Az adatok frissítése megtörtént!', id, Film, Idopont, Terem});
        }
    });
});

app.delete('/api/v1/mozi/vetites/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM vetites WHERE id = ?`, [id],
    function (err) {
        if (err) {
            res.status(500).json({ err: err.message});
        } else {
            res.json({ message: `A  ${id}-as/es vetítés törlése megtörtént.`});
        }
    });
});











//rendelés
app.post('/api/v1/mozi/rendeles', (req, res) => {
    const { Vetites, Nev, uid, Hely, Statusz } = req.body;
    console.log(req.body);
    const { error } = rendelesValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    db.run(`INSERT INTO rendeles (Vetites, Nev, uid, Hely, Statusz) VALUES (?, ?, ?, ?, ?)`,
    [Vetites, Nev, uid, Hely, Statusz],
    function (err) {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message: 'Sikeres validácó', id: this.lastID, Vetites, Nev, uid, Hely, Statusz});
        }
    });
});

app.get('/api/v1/mozi/rendeles', (req, res) => {
    db.all(`SELECT * FROM rendeles`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.get('/api/v1/mozi/rendeles/:id', (req, res) => {
    const { id } = req.params;
    db.all(`SELECT * FROM rendeles WHERE id = ?`, [id], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.put('/api/v1/mozi/rendeles/:id', (req, res) => {
    const { id } = req.params;
    const { Vetites, Nev, uid, Hely, Statusz } = req.body;
    const { error } = rendelesValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    db.run(`UPDATE rendeles SET Vetites = ?, Nev = ?, uid = ?, Hely = ?, Statusz = ? WHERE id = ?`,
    [Vetites, Nev, uid, Hely, Statusz, id],
    function (err) {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message: 'Az adatok frissítése megtörtént!', id, Vetites, Nev, uid, Hely, Statusz});
        }
    });
});

app.delete('/api/v1/mozi/rendeles/:id', (req, res) => {
    const { id } = req.params;
    const {Nev, Vetites} = req.body;
    db.run(`DELETE FROM filmek WHERE id = ?`, [id],
    function (err) {
        if (err) {
            res.status(500).json({ err: err.message});
        } else {
            res.json({ message: `A ${Nev} által rendelt ${Vetites}-es vetítésre szóló ${id}-as/es számú rendelés törlése megtörtént.`});
        }
    });
});









//terem
app.post('/api/v1/mozi/terem', (req, res) => {
    const { Ferohely, Tipus, Sorok, Allapot } = req.body;
    console.log(req.body);
    const { error } = teremValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    db.run(`INSERT INTO terem (Ferohely, Tipus, Sorok, Allapot) VALUES (?, ?, ?, ?)`,
    [Ferohely, Tipus, Sorok, Allapot],
    function (err) {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message: 'Sikeres validácó', id: this.lastID, Ferohely, Tipus, Sorok, Allapot});
        }
    });
});

app.get('/api/v1/mozi/terem', (req, res) => {
    db.all(`SELECT * FROM terem`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.get('/api/v1/mozi/terem/:id', (req, res) => {
    const { id } = req.params;
    db.all(`SELECT * FROM terem WHERE id = ?`, [id], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.put('/api/v1/mozi/terem/:id', (req, res) => {
    const { id } = req.params;
    const { Ferohely, Tipus, Sorok, Allapot } = req.body;
    const { error } = teremValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    db.run(`UPDATE terem SET Ferohely = ?, Tipus = ?, Sorok = ?, Allapot = ? WHERE id = ?`,
    [Ferohely, Tipus, Sorok, Allapot, id],
    function (err) {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message: 'Az adatok frissítése megtörtént!', id, Ferohely, Tipus, Sorok, Allapot});
        }
    });
});

app.delete('/api/v1/mozi/terem/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM terem WHERE id = ?`, [id],
    function (err) {
        if (err) {
            res.status(500).json({ err: err.message});
        } else {
            res.json({ message: `A ${id}-as/es terem törlése megtörtént.`});
        }
    });
});






//felhasználók
app.post('/api/v1/mozi/Felhasznalok', (req, res) => {
    const { Fnev, Jelszo, Email } = req.body;
    console.log(req.body);
    const { error } = felhValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    db.run(`INSERT INTO Felhasznalok (Fnev, Jelszo, Email) VALUES (?, ?, ?)`,
    [Fnev, Jelszo, Email],
    function (err) {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message: 'Sikeres validácó', id: this.lastID, Fnev, Jelszo, Email});
        }
    });
});

app.get('/api/v1/mozi/Felhasznalok', (req, res) => {
    db.all(`SELECT * FROM Felhasznalok`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.get('/api/v1/mozi/Felhasznalok/:id', (req, res) => {
    const { id } = req.params;
    db.all(`SELECT * FROM Felhasznalok WHERE id = ?`, [id], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

app.put('/api/v1/mozi/Felhasznalok/:id', (req, res) => {
    const { id } = req.params;
    const { Fnev, Jelszo, Email, Statusz } = req.body;
    const { error } = felhValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    db.run(`UPDATE Felhasznalok SET Fnev = ?, Jelszo = ?, Email = ?, Statusz = ? WHERE id = ?`,
    [Fnev, Jelszo, Email, Statusz, id],
    function (err) {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({message: 'Az adatok frissítése megtörtént!', id, Fnev, Jelszo, Email, Statusz});
        }
    });
});

app.delete('/api/v1/mozi/Felhasznalok/:id', (req, res) => {
    const { id } = req.params;
    const {Fnev} = req.body;
    db.run(`DELETE FROM Felhasznalok WHERE id = ?`, [id],
    function (err) {
        if (err) {
            res.status(500).json({ err: err.message});
        } else {
            res.json({ message: `A ${id}-as/es számú ${Fnev} nevű felhasználó törlése megtörtént.`});
        }
    });
});






app.listen(port, () => {
    console.log(`A szerver fut  ${port}-es számú porton.`);
});