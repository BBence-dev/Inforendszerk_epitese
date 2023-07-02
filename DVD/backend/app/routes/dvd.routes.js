module.exports = app => { // Express alkalmazást vár paraméterként

    const dvd = require("../controllers/dvd.controller.js"); // Tutorial kontroller importálása
  
    var router = require("express").Router(); // Express útvonalkezelő objektum létrehozása
  
    // Új Tutorial létrehozása
    router.post("/", dvd.create);
  
    // Az összes Tutorial lekérése
    router.get("/", dvd.findAll);
  
    // Az összes publikált Tutorial lekérése
    router.get("/condition", dvd.findAllPublished);
  
    // Egyetlen Tutorial lekérése az azonosítóval
    router.get("/:id", dvd.findOne);
  
    // Tutorial frissítése az azonosítóval
    router.put("/:id", dvd.update);
  
    // Tutorial törlése az azonosítóval
    router.delete("/:id", dvd.delete);
  
    // Az összes Tutorial törlése
    router.delete("/", dvd.deleteAll);
  
    app.use("/api/dvds", router); // Útvonal hozzáadása az alkalmazáshoz
  };
  