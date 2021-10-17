const User = require('../models/User')

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      req.session.user = {
        nome: usuarioRecuperado.nome,
        sobrenome: usuarioRecuperado.sobrenome,
        curso: usuarioRecuperado.curso,
        email: user.data.email,
        cpf: usuarioRecuperado.cpf,
        telefone: usuarioRecuperado.telefone,
        instituicao: usuarioRecuperado.instituicao,
        cidade: usuarioRecuperado.cidade,
        senha: user.data.senha,
        nascimento: usuarioRecuperado.nascimento,
        horas_acs: usuarioRecuperado.horas_acs,
        horas_aes: usuarioRecuperado.horas_aes,
        matricula: usuarioRecuperado.matricula
      }
      req.session.save(function () {
        res.redirect('/home')
      })
    })
    .catch(function (err) {
      res.send(err)
    })
}

exports.logout = function (req, res) {
  req.session.destroy(function () {
    res.redirect("/")
  })
}