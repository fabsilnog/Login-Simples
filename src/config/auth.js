const model = require('../models');
const Usuario = model.Usuario;
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: "email", passwordField: "senhal" }, (email, senhal, done) => {
        Usuario.findOne({ where: { email: email } }).then((usuario) => {
            if (!usuario) {
                return done(null, false, { msg: "Usuario não encontrado!" });
            }
            const res = bcrypt.compare(senhal, usuario.senhal, (err, resposta) => {
                if (resposta) {
                    return done(null, usuario);
                } else {
                    return done(null, false, { msg: "Erro ao logar!" + err });
                }
            })
        });
    }));
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id);
    });

    passport.deserializeUser((id, done) => {
        Usuario.findOne({ where: { id: id } }).then((res) => {
            if (res) {
                return done(null, false, { msg: "Não encontrado !" });
            } else {
                done(null, res);
            }
        });
    });
}