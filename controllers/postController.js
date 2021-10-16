const Certificados = require('../models/Certificados');

exports.postACs = function (req, res) {
    let resultado_categoria = new Certificados()
    resultado_categoria.readCatAcs()
        .then(function (categorias_recuperadas_acs) {
            res.render('pages/postACs', { categorias_recuperadas_acs: categorias_recuperadas_acs, layout: 'pages/postACs' })
        }).catch(function (err) {
            res.send(err);
        })

};

exports.postAEs = function (req, res) {
    let resultado_categoria = new Certificados()
    resultado_categoria.readCatAes()
        .then(function (resultado_categoria) {
            res.render('pages/postAEs', { resultado_categorias: resultado_categoria, layout: 'pages/postAEs' })
        }).catch(function (err) {
            res.send(err);
        })
};















// User
exports.pegarAtividades = function (req, res) {
    let certificado = new Certificados(req.file, null, req.session.user.email)
    certificado
        .readAll()
        .then(function (resultado) {
            res.render("pages/estatisticas", { certificado: resultado })
        })
        .catch(function (err) {
            res.send(err);
        })
};


// CertificadoAcsController

exports.postACs = function (req, res) {
    let resultado_categoria = new Certificados()
    resultado_categoria.readCatAcs()
        .then(function (categorias_recuperadas_acs) {
            res.render('pages/postACs', { categorias_recuperadas_acs: categorias_recuperadas_acs, layout: 'pages/postACs' })
        }).catch(function (err) {
            res.send(err);
        })

};

exports.getAllACs = function (req, res) {
    let certificado = new Certificados(req.file, null, req.session.user.email)
    certificado.readAllACs().then(function (resultado) {
        res.render("pages/atividadesComplementares", { certificado: resultado })
    }).catch(function (err) {
        res.send(err);
    })
};

exports.getByIdAc = function (req, res) {
    const id = req.params.id_certificado;
    let certificado = new Certificados(null, null, req.session.user.email);
    certificado
        .readOneById(id)
        .then(function (resultado) {
            res.render("pages/mostrar_ac", { certificado: resultado, layout: 'pages/mostrar_ac' })
        })
        .catch(function (err) {
            res.send(err);
        });
};


exports.apagarCertificadoACs = function (req, res) {
    const nome = req.params.nome
    let certificado = new Certificados(null, null, req.session.user.email)
    certificado
        .removerHorasACs(nome).then(certificado.apagarAws(nome)).then(certificado.apagar(nome))
        .then(function (resultado) {
            res.redirect('/home')
        })
        .catch(function (err) {
            res.send(err)
        })
};

// CertificadoAesController

exports.getAllAEs = function (req, res) {
    let certificado = new Certificados(req.file, null, req.session.user.email)
    certificado
        .readAllAEs()
        .then(function (resultado) {
            res.render("pages/extensao", { certificado: resultado })
        })
        .catch(function (err) {
            res.send(err);
        })
};


exports.getByIdAe = function (req, res) {
    const id = req.params.id_certificado;
    let certificado = new Certificados(null, null, req.session.user.email);
    certificado
        .readOneById(id)
        .then(function (resultado) {
            console.log(resultado)
            res.render("pages/mostrar_ae", { certificado: resultado, layout: 'pages/mostrar_ae' })
        })
        .catch(function (err) {
            res.send(err);
        });
};


exports.apagarCertificadoAEs = function (req, res) {
    const nome = req.params.nome
    let certificado = new Certificados(null, null, req.session.user.email)
    certificado
        .removerHorasAEs(nome).then(certificado.apagarAws(nome)).then(certificado.apagar(nome))
        .then(function (resultado) {
            res.redirect('/home')
        })
        .catch(function (err) {
            res.send(err)
        })
};
