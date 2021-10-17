const Certificados = require('../models/Certificados');


exports.uploadsAcs = function (req, res) {
    let certificados = new Certificados(req.file, req.body, req.session.user.email)
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

exports.apagarCertificadoAcs = function (req, res) {
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

exports.subcategorias_json = function (req, res) {
    let certificado = new Certificados()
    certificado.readCatAcsSubCategoria(req.params.id_tipo_atividade_acs_fk)
        .then(function (subcategorias_recuperadas) {
            res.json({ subcategorias_recuperadas: subcategorias_recuperadas })
        })
        .catch(function (err) {
            res.send(err)
        })
}