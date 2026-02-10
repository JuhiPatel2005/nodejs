const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add home",
    currentPage: "addHome",
    editing:false
  });
};

exports.getHostHomes = (req, res, next) => {
   Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "host-homes",
      currentPage: "host-homes",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { housename, price, location, photourl, description } = req.body;
  const newHome = new Home({
    housename: housename,
    price: price,
    location: location,
    imageUrl: photourl,
    description: description
  });

  newHome.save().then(() => {
    console.log('Home saved successfully');
    res.redirect("/host/host-homes");
  }).catch(err => {
    console.log('Error saving home:', err);
    res.status(500).send('Error adding home');
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log('Home not found:', homeId);
      return res.redirect("/host/host-homes");
    }
    console.log(homeId, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your home",
      currentPage: "host-homes",
      editing: editing
    });
  }).catch(err => {
    console.log('Error fetching home:', err);
    res.redirect("/host/host-homes");
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, housename, price, location, photoUrl, description} = req.body;
  Home.findByIdAndUpdate(id, {
    housename: housename,
    price: price,
    location: location,
    imageUrl: photoUrl,
    description: description
  }).then(result => {
    console.log('Home updated', result);
    res.redirect("/host/host-homes");
  }).catch(err => {
    console.log('Error updating home:', err);
    res.status(500).send('Error updating home');
  });
};

exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log('came to delete', homeId);
    Home.findByIdAndDelete(homeId).then(() => {
      res.redirect("/host/host-homes");
    }).catch(err => {
      console.log('Error deleting home:', err);
      res.status(500).send('Error deleting home');
    });
};
