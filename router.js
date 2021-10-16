const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const User = require('./models/User')
const Certificados = require('./models/Certificados')
const loginVerification = require('./middlewares/mustBeLoggedIn')

const userController = require('./controllers/userController')
const certificadosAcsController = require('./controllers/certificadosAcsController')
const certificadosAesController = require('./controllers/certificadosAesController')
const postController = require('./controllers/postController')
const gamificationController = require('./controllers/gamificationController')

//roteamentos do usuário
router.get('/', userController.login_form)
router.post('/login', userController.login)
router.get('/home', userController.home)
router.get('/cadastro', userController.cadastro)
/**
 * Requisição para fazer a query retornando apenas os cursos
 * com determinado TIPO_CURSO, por isso, o parâmetro GET
 * para consulta -> "id_tipo_curso_fk" que será lançado com FETCH
 */
router.get('/cursos_json/:id_tipo_curso_fk', userController.cursos_json)
router.get('/subcategorias_json/:id_tipo_atividade_acs_fk', postController.subcategorias_json)

router.get('/esqueciASenha', userController.esqueciASenha)
router.get('/perfilDoAluno', loginVerification.mustBeLoggedIn, userController.perfilDoAluno)
router.post('/cadastrar', userController.cadastrar)
router.get('/logout', userController.logout)
router.post('/alterarDados', loginVerification.mustBeLoggedIn, userController.alterarDados)
router.get('/estatisticas', loginVerification.mustBeLoggedIn, postController.pegarAtividades, userController.estatisticas)
router.get('/ranking', loginVerification.mustBeLoggedIn, gamificationController.rankingHighlight)

//roteamento de post
router.get('/postACs', loginVerification.mustBeLoggedIn, postController.postACs)
router.get('/postAEs', loginVerification.mustBeLoggedIn, postController.postAEs)
router.get('/apagarCertificadoACs/:nome', loginVerification.mustBeLoggedIn, certificadosAcsController.apagarCertificadoACs)
router.get('/apagarCertificadoAEs/:nome', loginVerification.mustBeLoggedIn, certificadosAesController.apagarCertificadoAEs)

router.post('/uploadACs', multer(multerConfig).single('certificados'), (req, res) => {
    
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
});

router.post('/uploadAEs', multer(multerConfig).single('certificados'), (req, res) => {
    let certificados = new Certificados(req.file, req.body, req.session.user.email)
    certificados
        .create().then(certificados.contabilizarHorasAEs())
        .then(function (result) {
            
            res.redirect('extensao')
        })
        .catch(function (err) {
            res.send('err')
        })
});


//roteamento de certificados
router.get('/atividadesComplementares', loginVerification.mustBeLoggedIn, certificadosAcsController.getAllACs, userController.atividadesComplementares)
router.get('/extensao', loginVerification.mustBeLoggedIn, certificadosAesController.getAllAEs, userController.extensao)
router.get('/estatisticas', loginVerification.mustBeLoggedIn, userController.estatisticas)
router.get('/mostrar_ac/:id_certificado', loginVerification.mustBeLoggedIn, certificadosAcsController.getByIdAc)
router.get('/mostrar_ae/:id_certificado', loginVerification.mustBeLoggedIn, certificadosAesController.getByIdAe)
module.exports = router