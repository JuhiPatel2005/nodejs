exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: req.isLoggedIn || false,
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  req.session.isLoggedIn = true;
  req.session.username = username;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
  
};