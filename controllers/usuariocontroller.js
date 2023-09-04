//-------------------------------------------------------------------------------------------------
const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuariomodel')
//-------------------------------------------------------------------------------------------------
router.get('/',(req,res) => {
  Usuario.findAll().then((usuarios) => {
    res.render('usuarioviews/gerenciaview',{usuarios:usuarios})
  }).catch((erro) => {
    req.flash('erros_msg','Houve ou erro ao listar usuários!')
    console.log(erro)
    res.redirect('/')
  })
})
//-------------------------------------------------------------------------------------------------
router.get('/exibirinclusaoroute',(req,res) => {
  res.render('usuarioviews/inclusaoview')
})
//-------------------------------------------------------------------------------------------------
router.post('/incluirroute',(req,res) => {
  var erros = []
  if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({texto:'Nome inválido!'})
  }
  if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
    erros.push({texto:'E-mail inválido!'})
  }
  if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
    erros.push({texto:'Senha inválida!'})
  }
  if (!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null) {
    erros.push({texto:'Telefone inválido!'})
  }
  if (erros.length > 0) {
    res.render('usuarioviews/inclusaoview',{erros:erros})
  } else {
    Usuario.create({
      nome:req.body.nome,
      email:req.body.email,
      senha:req.body.senha,
      telefone:req.body.telefone
    }).then(() => {
      req.flash('success_msg','Usuário incluído com sucesso!')
      res.redirect('/usuarioroutes')
    }).catch((erro) => {
      req.flash('erros_msg','Não foi possível incluir o usuário!')
      console.log(erro)
      res.redirect('/usuarioroutes')
    })
  }
})
//-------------------------------------------------------------------------------------------------
router.get('/alteracaoroute/:id',(req,res) => {
  Usuario.findOne({where:{id:req.params.id}}).then((usuario) => {
    res.render('usuarioviews/alteracaoview',{usuario:usuario})
  }).catch((err) => {
    req.flash('erros_msg','Não foi possível encontrar o usuário!')
    console.log(erro)
    res.redirect('/usuarioroutes')
  })
})
//-------------------------------------------------------------------------------------------------
router.post('/alterarroute',(req,res) => {
  var erros = []
  if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({texto:'Nome inválido!'})
  }
  if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
    erros.push({texto:'E-mail inválido!'})
  }
  if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
    erros.push({texto:'Senha inválida!'})
  }
  if (!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null) {
    erros.push({texto:'Telefone inválido!'})
  }
  if (erros.length > 0) {
    res.render('usuarioviews/alteracaoview',{erros:erros})
  } else {
    Usuario.findOne({where:{id:req.body.id}}).then((usuario) => {
      usuario.nome = req.body.nome
      usuario.email = req.body.email
      usuario.senha = req.body.senha
      usuario.telefone = req.body.telefone
      usuario.save().then(() => {
        req.flash('success_msg','Usuário alterado com sucesso!')
        res.redirect('/usuarioroutes')
      }).catch((erro) => {
        req.flash('error_msg','Não foi possível alterar o usuário!')
        console.log(erro)
        res.redirect('/usuarioroutes')
      })
    }).catch((erro) => {
      req.flash('error_msg','Não foi possível encontrar o usuário!')
      console.log(erro)
      res.redirect('/usuarioroutes')
    })
  }
})
//-------------------------------------------------------------------------------------------------
router.post('/excluirroute',(req,res) => {
  Usuario.destroy({where:{id:req.body.id}}).then(() => {
    req.flash('success_msg','Usuário excluído com sucesso!')
    res.redirect('/usuarioroutes')
  }).catch((erro) => {
    req.flash('error_msg','Não foi possível excluir o usuário!')
    console.log(erro)
    res.redirect('/usuarioroutes')
  })
})
//-------------------------------------------------------------------------------------------------
module.exports = router
//-------------------------------------------------------------------------------------------------