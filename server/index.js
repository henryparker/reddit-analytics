const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/dev');
const passport = require('passport');
const bodyParser = require('body-parser');



require('./models/User');
require('./models/FavoriteChart');
require('./services/passport');
 const User = mongoose.model('users');
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
  );
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute')(app);
require('./routes/chartRoute')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);