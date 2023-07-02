const dbConfig = require("../config/db.config.js"); // Az adatbázis konfigurációs fájl betöltése

const mongoose = require("mongoose"); // Mongoose modul betöltése
mongoose.Promise = global.Promise; // Mongoose ígéretek globális beállítása

const db = {}; // Üres objektum létrehozása az adatbázishoz kapcsolódó információk tárolásához
db.mongoose = mongoose; // Mongoose objektum hozzáadása az objektumhoz
db.url = dbConfig.url; // Adatbázis URL hozzáadása az objektumhoz a konfigurációs fájlból
db.Users = require("./user.model.js")(mongoose); // Tutorial adatbázis modell betöltése és hozzáadása az objektumhoz, Mongoose objektummal paraméterként
db.Dvds = require("./dvd.model.js")(mongoose);
module.exports = db; // Az objektum exportálása a kívülről történő hozzáféréshez
