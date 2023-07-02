module.exports = app => { // Express alkalmazást vár paraméterként

  const user = require("../controllers/user.controller.js"); //  kontroller importálása

  var router = require("express").Router(); // Express útvonalkezelő objektum létrehozása

  // Új  létrehozása
  router.post("/", user.create);

  // Az összes  lekérése
  router.get("/", user.findAll);

  // Az összes publikált  lekérése
  router.get("/condition", user.findAllPublished);

  // Egyetlen  lekérése az azonosítóval
 router.get("/:id", user.findOne);
 
  //router.get("/:id", user.getUserProduct);

  //  frissítése az azonosítóval
  router.put("/:id", user.update);

  //  törlése az azonosítóval
  router.delete("/:id", user.delete);

  // Az összes  törlése
  router.delete("/", user.deleteAll);

 

  app.use("/api/users", router); // Útvonal hozzáadása az alkalmazáshoz
};
