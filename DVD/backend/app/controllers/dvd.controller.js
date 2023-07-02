const db = require("../models");// Az adatbázis modul importálása
const Dvd = db.Dvds;// A Tutorial modell importálása az adatbázis modulból

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request - Kérés érvényességének ellenőrzése
  if (!req.body.cim) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }0

  // Create a Tutorial Tutorial entitás létrehozása
  const dvd = new Dvd({
    cim: req.body.cim, // A title mező értékének beállítása a kérés testéből
    beDatum: req.body.beDatum,
    sorszam: req.body.sorszam, 
    condition: req.body.condition, 
    user: req.body.user// A description mező értékének beállítása a kérés testéből
   // A published mező értékének beállítása a kérés testéből, vagy alapértelmezetten false értékre
  });

  // Save Tutorial in the database - Tutorial mentése az adatbázisba
  dvd
    .save(dvd) // A tutorial objektum mentése az adatbázisba
    .then(data => {
      res.send(data);// A sikeres mentés esetén az adatok küldése a válaszban
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Dvd from the database. - Az összes "Tutorial" entitás lekérdezése az adatbázisból
exports.findAll = (req, res) => {
  const dvd = req.query.cim; // A kérésből származó "title" query paraméter kiolvasása
  var condition = dvd ? { cim: { $regex: new RegExp(cim), $options: "i" } } : {};

  Dvd.find(condition)  // Az adatbázisból a "Tutorial" entitások lekérdezése a feltétel alapján
    .then(data => {
      res.send(data);// Az adatok küldése a válaszban
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Dvd."
      });
    });
};

// Find a single Tutorial with an id - Egyetlen "Tutorial" entitás lekérdezése az azonosítója alapján
exports.findOne = (req, res) => {
  const id = req.params.id; // Az azonosító kiolvasása a kérés paraméteréből

  Dvd.findById(id) // Az adatbázisból a "Tutorial" entitás lekérdezése az azonosító alapján
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data); // Az adatok küldése a válaszban
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Egy tutorial frissítése az azonosító alapján a kérésben
exports.update = (req, res) => {
  if (!req.body) {
    // Ellenőrizze, hogy a kérési test nem üres
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;// Az azonosító kinyerése a kérés paramétereiből
 // Mongoose findByIdAndUpdate() használata a tutorial frissítéséhez az azonosító alapján
  Dvd.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        // Ha a tutorial nem található, 404-es státuszkóddal és hibaüzenettel térünk vissza
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else
       // Ha a tutorial sikeresen frissítve lett, sikeres üzenettel térünk vissza
      res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      // Ha hiba történik, 500-as státuszkóddal és hibaüzenettel térünk vissza
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Egy tutorial törlése az azonosító alapján a kérésben
exports.delete = (req, res) => {
  const id = req.params.id;
// Az azonosító kinyerése a kérés paramétereiből
// Mongoose findByIdAndRemove() használata a tutorial törléséhez az azonosító alapján
  Dvd.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        // Ha a tutorial nem található, 404-es státuszkóddal és hibaüzenettel térünk vissza
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {// Ha a tutorial sikeresen törölve lett, sikeres üzenettel térünk vissza
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {// Ha hiba történik, 500-as státuszkóddal és hibaüzenettel térünk vissza
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Az összes Tutorial törlése az adatbázisból
exports.deleteAll = (req, res) => {
  Dvd.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Dvd were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Dvd."
      });
    });
};

// Az összes publikált Tutorial lekérése
exports.findAllPublished = (req, res) => {
  Dvd.find({ condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Dvd."
      });
    });
};
