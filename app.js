const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const ejs = require('ejs');

const pageRoute = require('./src/routes/pageRoute');
const photoRoute = require('./src/routes/photoRoute');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout extractScripts', true);

app.set('layout', './layouts/fullWidthLayout');
app.set('view engine', 'ejs');
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(fileUpload());

app.use('/', pageRoute);
app.use('/photos', photoRoute);

const uploadDir = 'public/uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//CONNECT DB
mongoose
  .connect('mongodb://localhost/pcat-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB CONNECTED SUCCESFULLY');
  });

app.listen(port, () => console.info(`App listening on port ${port}`));
