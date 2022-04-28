const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();
const userRouter = require('./src/routes/user.router');
const checkAuth = require('./src/middlewares/checkAuth');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.resolve(process.env.PWD, 'src', 'views'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'oh klahoma',
    resave: false,
    store: new FileStore(),
    saveUninitialized: false,
    name: 'sid',
    cookie: { httpOnly: true, maxAge: 60 * 60 * 1000 },
  })
);

app.use((req, res, next) => {
  res.locals.userId = req.session?.userId; // глобальная переменная userId теперь доступна во всех hbs
  next();
});

app.use('/user', userRouter);

app.get('/', checkAuth, (req, res) => {
  res.render('index');
});

app.get('/secret', checkAuth, (req, res) => {
  res.send('SECRET');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Vsyo horosho na porty ${PORT}`));
