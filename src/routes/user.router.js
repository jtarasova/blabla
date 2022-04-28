const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const { rapCheck, rockCheck } = require('../middlewares/lifeStyleCheck');

const saltRounds = 7;

router
  .route('/signUp')
  .get((req, res) => {
    res.render('signUp');
  })
  .post(async (req, res) => {
    const { nickName, lifeStyle, password } = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    const currUser = await User.create({
      name: nickName,
      lifestyle: lifeStyle,
      password: hash,
    });
    req.session.userId = currUser.id; // для того, чтобы была сразу авторизация
    req.session.lifestyle = currUser.lifestyle;
    res.redirect('/');
  });

router
  .route('/signIn')
  .get((req, res) => {
    res.render('signIn');
  })
  .post(async (req, res) => {
    const { nickName, password } = req.body;
    const user = await User.findOne({ where: { name: nickName } });
    const result = await bcrypt.compare(password, user.password); // сравниваем пароли
    if (result) {
      req.session.userId = user.id;
      req.session.lifestyle = user.lifestyle;
      res.redirect('/');
    } else {
      res.redirect('/user/signup');
    }
  });

router.get('/rap', rapCheck, (req, res) => {
  res.send('YA RONIAY ZAPAD');
});

router.get('/rock', rockCheck, (req, res) => {
  res.send('TZOY ZHIV');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid');
  res.redirect('/');
});
module.exports = router;
