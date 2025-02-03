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
        });
        return db;
    }
}