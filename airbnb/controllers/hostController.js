const Home = require("../models/home");
const registeredHomes = Home.registeredHomes;
const saveHomesToFile = Home.saveHomesToFile;

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add home",
    currentPage: "addHome",
    editing:false
  });
};

exports.getHostHomes = (req, res, next) => {
   Home.fetchAll().then(([registeredHomes]) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "host-homes",
      currentPage: "host-homes",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const photoUrl = (req.body.photourl || "").trim();
  const newHome = new Home(
    req.body.housename,
    req.body.price,
    req.body.location,
    photoUrl || null,
    req.body.description || null,
    req.body.id
  );

  newHome.save();
  saveHomesToFile();
  res.redirect("/host/host-home-list");
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      res.redirect("/host/host-home-list");
      return
    }
    console.log(homeId, home);
     res.render("host/edit-home", {
      home: home,
    pageTitle: "Edit your home",
    currentPage: "host-homes",
    editing: editing
  });
});
};

exports.postEditHome = (req, res, next) => {
  const photoUrl = (req.body.photourl || "").trim();
  const newHome = new Home(
    req.body.housename,
    req.body.price,
    req.body.location,
    photoUrl || null,
    req.body.description || null,
  );
  newHome.id = req.body.homeId;
  newHome.save();
  saveHomesToFile();
  res.redirect("/host/host-homes");
};

exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
  Home.deleteById(homeId).then(() => {
    res.redirect("/host/host-homes")
    .catch((err) => {
      console.log("Error while deleting home", err);
    });
  });
};


exports.registeredHomes = registeredHomes;
