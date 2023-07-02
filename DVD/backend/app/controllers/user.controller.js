const db = require("../models");// Az adatbázis modul importálása
const User = db.Users;// A  modell importálása az adatbázis modulból

// Create and Save a new 
exports.create = (req, res) => {
  // Validate request - Kérés érvényességének ellenőrzése
  if (!req.body.nev) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a   entitás létrehozása
  const user = new User({
    nev: req.body.nev, // A title mező értékének beállítása a kérés testéből
    telsz: req.body.telsz,
    igsz: req.body.igsz,
    lakcim: req.body.lakcim,
    product: req.body.product,// A description mező értékének beállítása a kérés testéből
    condition: req.body.condition ? req.body.condition : false // A published mező értékének beállítása a kérés testéből, vagy alapértelmezetten false értékre
  });

  // Save  in the database -  mentése az adatbázisba
  user
    .save(user) // A  objektum mentése az adatbázisba
    .then(data => {
      res.send(data);// A sikeres mentés esetén az adatok küldése a válaszban
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ."
      });
    });
};

// Retrieve all User from the database. - Az összes "" entitás lekérdezése az adatbázisból
exports.findAll = (req, res) => {
  const user = req.query.nev; // A kérésből származó "title" query paraméter kiolvasása
  var condition = user ? { nev: { $regex: new RegExp(nev), $options: "i" } } : {};

  User.find(condition)  // Az adatbázisból a "" entitások lekérdezése a feltétel alapján
    .then(data => {
      res.send(data);// Az adatok küldése a válaszban
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    });
};

// Find a single  with an id - Egyetlen "" entitás lekérdezése az azonosítója alapján
exports.findOne = (req, res) => {
  const id = req.params.id; // Az azonosító kiolvasása a kérés paraméteréből

  User.findById(id) // Az adatbázisból a "" entitás lekérdezése az azonosító alapján
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found  with id " + id });
      else res.send(data); // Az adatok küldése a válaszban
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving  with id=" + id });
    });
};

// Egy  frissítése az azonosító alapján a kérésben
exports.update = (req, res) => {
  if (!req.body) {
    // Ellenőrizze, hogy a kérési test nem üres
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;// Az azonosító kinyerése a kérés paramétereiből
 // Mongoose findByIdAndUpdate() használata a  frissítéséhez az azonosító alapján
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        // Ha a  nem található, 404-es státuszkóddal és hibaüzenettel térünk vissza
        res.status(404).send({
          message: `Cannot update  with id=${id}. Maybe  was not found!`
        });
      } else
       // Ha a  sikeresen frissítve lett, sikeres üzenettel térünk vissza
      res.send({ message: " was updated successfully." });
    })
    .catch(err => {
      // Ha hiba történik, 500-as státuszkóddal és hibaüzenettel térünk vissza
      res.status(500).send({
        message: "Error updating  with id=" + id
      });
    });
};

// Egy  törlése az azonosító alapján a kérésben
exports.delete = (req, res) => {
  const id = req.params.id;
// Az azonosító kinyerése a kérés paramétereiből
// Mongoose findByIdAndRemove() használata a  törléséhez az azonosító alapján
  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        // Ha a  nem található, 404-es státuszkóddal és hibaüzenettel térünk vissza
        res.status(404).send({
          message: `Cannot delete  with id=${id}. Maybe  was not found!`
        });
      } else {// Ha a  sikeresen törölve lett, sikeres üzenettel térünk vissza
        res.send({
          message: " was deleted successfully!"
        });
      }
    })
    .catch(err => {// Ha hiba történik, 500-as státuszkóddal és hibaüzenettel térünk vissza
      res.status(500).send({
        message: "Could not delete  with id=" + id
      });
    });
};

// Az összes  törlése az adatbázisból
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} User were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all User."
      });
    });
};

// Az összes publikált  lekérése
exports.findAllPublished = (req, res) => {
  User.find({ condition: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    }); 
};
exports.getUserProduct = async (req, res) => {
      try {
        const puserId = req.params.id;
        const puser = await User.findById(puserId).populate("dvd");
        if (!puser) {
          return res.status(404).json({ message: 'Termék nem található' });
        }
        res.json(puser);
      } catch (err) {
        res.status(500).send(err);
  }
};
