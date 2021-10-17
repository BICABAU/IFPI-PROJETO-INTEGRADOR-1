const Certificado = require('../models/Certificado');

exports.postACs = function (req, res) {
    let resultado_categoria = new Certificado()
    resultado_categoria.readCatAcs()
        .then(function (categorias_recuperadas_acs) {
            res.render('pages/postACs', { categorias_recuperadas_acs: categorias_recuperadas_acs, layout: 'pages/postACs' })
        }).catch(function (err) {
            res.send(err);
        })

};

exports.postAEs = function (req, res) {
    let resultado_categoria = new Certificado()
    resultado_categoria.readCatAes()
        .then(function (resultado_categoria) {
            res.render('pages/postAEs', { resultado_categorias: resultado_categoria, layout: 'pages/postAEs' })
        }).catch(function (err) {
            res.send(err);
        })
};

// User
exports.pegarAtividades = function (req, res) {
    let certificado = new Certificado(req.file, null, req.session.user.email)
    certificado
        .readAll()
        .then(function (resultado) {
            res.render("pages/estatisticas", { certificado: resultado })
        })
        .catch(function (err) {
            res.send(err);
        })
};