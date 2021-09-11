const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const cors = require('cors');
const path = require('path');

const router = require('./network/routes');

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const PORT_SERVER = process.env.PORT_SERVER || 7001;
const HOST_DB = process.env.HOST_DB || 'localhost';
const PORT_DB = process.env.PORT_DB || 27017;
const NAME_DB = process.env.NAME_DB || 'nodejs';
const URI_DB = `mongodb://${HOST_DB}:${PORT_DB}/${NAME_DB}`;
const CFG_DB = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(URI_DB, CFG_DB).then(
    () => { 
      console.log(`[SERVER] :: Connected to the DB ${URI_DB}`);
    }, err => {
      console.log(`[ERROR] :: Server can't connect to the DB ${URI_DB}`);
    }
);

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

router(app);

app.listen(PORT_SERVER, () => {
    console.log(`[SERVER] :: Listening on port ${PORT_SERVER}`);
});
