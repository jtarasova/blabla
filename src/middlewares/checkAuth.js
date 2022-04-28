const checkAuth = (req, res, next) => {
  if (!req.session?.userId) {
    return res.redirect('/user/signin');
  }
  next();
};

module.exports = checkAuth;
