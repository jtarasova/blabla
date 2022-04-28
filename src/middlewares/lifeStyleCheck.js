const rapCheck = (req, res, next) => {
  if (req.session?.lifestyle !== 'rap') {
    res.send('GO AWAY');
  } else {
    next();
  }
};

const rockCheck = (req, res, next) => {
  if (req.session?.lifestyle !== 'rock') {
    res.send('GO AWAY');
  } else {
    next();
  }
};

module.exports = { rapCheck, rockCheck };
