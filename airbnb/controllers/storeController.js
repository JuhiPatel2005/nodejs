const Home = require("../models/home");
const { registeredHomes } = require("./hostController");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Airbnb",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
   Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/home-list", {
      registeredHomes: homes,
      pageTitle: "home-list",
      currentPage: "home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.fetchAll((homes) =>
    res.render("store/bookings", {
      registeredHomes: homes,
      pageTitle: "My Bookings",
      currentPage: "bookings",
    }),
  );
};

exports.getFavouriteList = (req, res, next) => {

   Home.fetchAll().then(([registeredHomes]) => {
    const favHomes = registeredHomes.filter((h) => favIds.includes(String(h.id)));
    res.render("store/favourite-list", {
      registeredHomes: favHomes,
      pageTitle: "favourite-list",
      currentPage: "favourite-list",
    });
  });
};

exports.postAddFavourite = (req, res) => {
  const homeId = req.body.homeId || req.params.homeId;
  const favPath = require("path").join(
    require("../utils/pathUTIL"),
    "data",
    "favourites.json",
  );
  const fs = require("fs");

  try {
    let favIds = [];
    if (fs.existsSync(favPath)) {
      favIds = JSON.parse(fs.readFileSync(favPath, "utf8")) || [];
    }
    const idStr = String(homeId);
    if (!favIds.includes(idStr)) {
      favIds.push(idStr);
      fs.writeFileSync(favPath, JSON.stringify(favIds, null, 2), "utf8");
    }
  } catch (err) {
    console.error("Error updating favourites:", err.message);
  }

  res.redirect("/favourite-list");
};

exports.postremoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, (err) => {
    if (err) {
      console.log("Error while removing from favourites", err);
    }
    res.redirect("/favourites");
  });
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;

  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      return res.status(404).send("Home not found");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: home.housename,
        currentPage: "home",
      });
    }
  });
};
