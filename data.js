module.exports = function(){
    this.get_db = function(){
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('mozi.db');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS filmek (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cim TEXT NUT NULL,
                mufaj TEXT NOT NULL,
                kategoria TEXT NOT NULL,
                rendezo TEXT NOT NULL
                );`);
                db.run(`CREATE TABLE IF NOT EXISTS rendeles (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Vetites INTEGER NOT NULL,
                    Nev TEXT NOT NULL,
                    uid INTEGER NOT NULL,
                    Hely TEXT NOT NULL,
                    Statusz TEXT NOT NULL
                    );`);
                db.run(`CREATE TABLE IF NOT EXISTS vetites (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Film INTEGER NOT NULL,
                    Idopont TEXT NOT NULL,
                    Terem INTEGER NOT NULL
                    );`);
                db.run(`CREATE TABLE IF NOT EXISTS terem (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Ferohely INTEGER NOT NULL,
                    Tipus TEXT NOT NULL,
                    Sorok INTEGER NOT NULL,
                    Allapot TEXT NOT NULL
                    );`);
                db.run(`CREATE TABLE IF NOT EXISTS Felhasznalok (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Fnev TEXT NOT NULL,
                    Jelszo TEXT NOT NULL,
                    Email TEXT NOT NULL,
                    Statusz INTEGER NOT NULL DEFAULT 1
                    )`);            
        });
        return db;
    }
}