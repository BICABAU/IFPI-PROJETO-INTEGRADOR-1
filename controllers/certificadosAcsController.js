const Certificado = require('../models/Certificado');


exports.uploadsAcs = function (req, res) {
    let certificados = new Certificado(req.file, req.body, req.session.user.email)
    certificados
        .create().then(certificados.contabilizarHorasACs())
        .then(function (result) {
            console.log(req.file)
            res.redirect('atividadesComplementares')
        })
        .catch(function (err) {
            res.send('err')
        })
};

exports.getAllAcs = function (req, res) {
    let certificado = new Certificado(req.file, null, req.session.user.email)
    certificado.readAllACs().then(function (resultado) {
        res.render("pages/atividadesComplementares", { certificado: resultado })
    }).catch(function (err) {
        res.send(err);
    })
};

exports.getByIdAc = function (req, res) {
    const id = req.params.id_certificado;
    let certificado = new Certificado(null, null, req.session.user.email);
    certificado
        .readOneById(id)
        .then(function (resultado) {
            res.render("pages/mostrar_ac", { certificado: resultado, layout: 'pages/mostrar_ac' })
        })
        .catch(function (err) {
            res.send(err);
        });
};

exports.apagarCertificadoAcs = function (req, res) {
    const nome = req.params.nome
    let certificado = new Certificado(null, null, req.session.user.email)
    certificado
        .removerHorasACs(nome).then(certificado.apagarAws(nome)).then(certificado.apagar(nome))
        .then(function (resultado) {
            res.redirect('/home')
        })
        .catch(function (err) {
            res.send(err)
        })
};