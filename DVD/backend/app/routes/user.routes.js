module.exports = app => { // Express alkalmazást vár paraméterként

  const user = require("../controllers/user.controller.js"); // Tutorial kontroller importálása

  var router = require("express").Router(); // Express útvonalkezelő objektum létrehozása

  // Új Tutorial létrehozása
  router.post("/", user.create);

  // Az összes Tutorial lekérése
  router.get("/", user.findAll);

  // Az összes publikált Tutorial lekérése
  router.get("/condition", user.findAllPublished);

  // Egyetlen Tutorial lekérése az azonosítóval
 router.get("/:id", user.findOne);
 
  //router.get("/:id", user.getUserProduct);

  // Tutorial frissítése az azonosítóval
  router.put("/:id", user.update);

  // Tutorial törlése az azonosítóval
  router.delete("/:id", user.delete);

  // Az összes Tutorial törlése
  router.delete("/", user.deleteAll);

 

  app.use("/api/users", router); // Útvonal hozzáadása az alkalmazáshoz
};
