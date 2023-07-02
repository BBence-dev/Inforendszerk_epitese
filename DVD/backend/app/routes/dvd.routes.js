module.exports = app => { // Express alkalmazást vár paraméterként

    const dvd = require("../controllers/dvd.controller.js"); //  kontroller importálása
  
    var router = require("express").Router(); // Express útvonalkezelő objektum létrehozása
  
    // Új  létrehozása
    router.post("/", dvd.create);
  
    // Az összes  lekérése
    router.get("/", dvd.findAll);
  
    // Az összes publikált  lekérése
    router.get("/condition", dvd.findAllPublished);
  
    // Egyetlen  lekérése az azonosítóval
    router.get("/:id", dvd.findOne);
  
    //  frissítése az azonosítóval
    router.put("/:id", dvd.update);
  
    //  törlése az azonosítóval
    router.delete("/:id", dvd.delete);
  
    // Az összes  törlése
    router.delete("/", dvd.deleteAll);
  
    app.use("/api/dvds", router); // Útvonal hozzáadása az alkalmazáshoz
  };
  
