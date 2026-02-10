const Favourites = require("../models/favourites");
const Home = require("../models/home");
const Bookings = require("../models/bookings");
const { registeredHomes } = require("./hostController");

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Airbnb",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
   Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "home-list",
      currentPage: "home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  Bookings.getBookings().then((bookings) => {
    if (bookings.length === 0) {
      return res.render("store/bookings", {
        registeredHomes: [],
        pageTitle: "My Bookings",
        currentPage: "bookings",
      });
    }
    
    // Get details for each booked home
    const homeIds = bookings.map(b => b.homeId);
    return Home.find().then(allHomes => {
      const bookedHomes = allHomes.filter(home => 
        homeIds.includes(String(home._id))
      ).map(home => {
        const booking = bookings.find(b => String(b.homeId) === String(home._id));
        return {
          ...home,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          totalPrice: booking.totalPrice,
          nights: booking.nights,
          bookingId: booking._id
        };
      });
      
      res.render("store/bookings", {
        registeredHomes: bookedHomes,
        pageTitle: "My Bookings",
        currentPage: "bookings",
      });
    });
  }).catch(err => {
    console.log('Error fetching bookings:', err);
    res.render("store/bookings", {
      registeredHomes: [],
      pageTitle: "My Bookings",
      currentPage: "bookings",
    });
  });
};

exports.getFavouriteList = (req, res, next) => {
   Favourites.find()
   .populate('houseId')
   .then((favourites) => {
    const favouriteHomes = favourites.map((fav) => fav.homeId);
    res.render('store/favourite-list', {
      registeredHomes: favouriteHomes,
      pageTitle: 'My Favourites',
      currentPage: 'favourite-list'
    });
   });
};

exports.postAddFavourite = (req, res) => {
  const homeId = req.body.id;
  Favourites.findOne({ homeId: homeId})
  .then(fav => {
    if(fav){
       console.log('Already marked as favourites.');
       return res.redirect('/favourite-list');
    } else {
       const fav = new Favourites( {homeId: homeId});
       fav.save();
    }
  })
  .then(() => {
    res.redirect('/favourite-list');
  })
  .catch(err => {
    console.log('Error adding to favourites: ', err);
    res.status(500).send('Error adding to favourites');
  });
};

exports.postRemoveFromFavourites = (req,res,next) => {
  const homeId = req.params.homeId;
  Favourites.findOneAndDelete({ homeId: homeId }).then(result => {
    console.log('Fav removed: ', result);
  }).catch(err => {
    console.log('Error removing from fav: ', err);
  }).finally(() => {
    res.redirect('/favourite-list');
  });
};

exports.postBookHome = (req, res) => {
  const homeId = req.body.homeId;
  const checkInDate = req.body.checkInDate;
  const checkOutDate = req.body.checkOutDate;
  const price = parseFloat(req.body.price);

  // Calculate nights between dates
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const totalPrice = price * nights;

  if (!homeId || !checkInDate || !checkOutDate || nights <= 0) {
    console.log('Invalid booking data');
    return res.status(400).send('Invalid booking dates');
  }

  const booking = new Bookings({
    homeId: homeId,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    totalPrice: totalPrice,
    nights: nights
  });
  booking.save().then(result => {
    console.log('Booking saved:', result);
    res.redirect('/bookings');
  }).catch(err => {
    console.log('Error saving booking:', err);
    res.status(500).send('Error creating booking');
  });
};

exports.postCancelBooking = (req, res) => {
  const bookingId = req.params.bookingId;
  Bookings.findByIdAndDelete(bookingId).then(result => {
    console.log('Booking cancelled:', result);
  }).catch(err => {
    console.log('Error cancelling booking:', err);
  }).finally(() => {
    res.redirect('/bookings');
  });
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;

  Home.findById(homeId).then((home) => {
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
