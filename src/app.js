const express = require('express');
const app = express();
const router = require ('./router/router');
const session = require ('express-session');
const passport = require('passport');
require('./config/auth')(passport);

app.use(session ({
    secret:"PassportLogin",
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(router);




app.listen(3030, function (req,res) {
    console.log("Funcionando");
})