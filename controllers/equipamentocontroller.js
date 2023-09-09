//-------------------------------------------------------------------------------------------------
const express = require('express')
const router = express.Router()
const Equipamento = require('../models/equipamentomodel')
const {isAuthenticaded} = require("../helpers/isAuthenticated")
//-------------------------------------------------------------------------------------------------
router.get('/',isAuthenticaded,(req,res) => {
  Equipamento.findAll().then((equipamentos) => {
    res.render('equipamentoviews/gerenciaview',{equipamentos:equipamentos})
  }).catch((erro) => {
    req.flash('erros_msg','Houve ou erro ao listar equipamentos!')
    console.log(erro)
    res.redirect('/')
  })
})
//-------------------------------------------------------------------------------------------------
router.get('/exibirinclusaoroute',isAuthenticaded,(req,res) => {
  res.render('equipamentoviews/inclusaoview')
})
//-------------------------------------------------------------------------------------------------
router.post('/incluirroute',isAuthenticaded,(req,res) => {
  var erros = []
  if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({texto:'Nome inválido!'})
  }
  if (!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null) {
    erros.push({texto:'Descricao inválida!'})
  }
  if (!req.body.codigo || typeof req.body.codigo == undefined || req.body.codigo == null) {
    erros.push({texto:'Código inválido!'})
  }
  if (!req.body.numeroserie || typeof req.body.numeroserie == undefined || req.body.numeroserie == null) {
    erros.push({texto:'Numero de série inválido!'})
  }
  if (!req.body.imagem || typeof req.body.imagem == undefined || req.body.imagem == null) {
    erros.push({texto:'Imagem inválida!'})
  }
  if (erros.length > 0) {
    res.render('equipamentoviews/inclusaoview',{erros:erros})
  } else {
    Equipamento.create({
      nome:req.body.nome,
      descricao:req.body.descricao,
      codigo:req.body.codigo,
      numeroserie:req.body.numeroserie,
      imagem:req.body.imagem
    }).then(() => {
      req.flash('success_msg','Equipamento incluído com sucesso!')
      res.redirect('/equipamentoroutes')
    }).catch((err) => {
      req.flash('erros_msg','Não foi possível incluir o equipamento!')
      console.log(err)
      res.redirect('/equipamentoroutes')
    })
  }
})
//-------------------------------------------------------------------------------------------------
router.get('/alteracaoroute/:id',isAuthenticaded,(req,res) => {
  Equipamento.findOne({where:{id:req.params.id}}).then((equipamento) => {    
    res.render('equipamentoviews/alteracaoview',{equipamento:equipamento})
  }).catch((err) => {
    req.flash('erros_msg','Não foi possível encontrar o equipamento!')
    console.log(erro)
    res.redirect('/equipamentoroutes')
  })
})
//-------------------------------------------------------------------------------------------------
router.post('/alterarroute',isAuthenticaded,(req,res) => {
  var erros = []
  if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({texto:'Nome inválido!'})
  }
  if (!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null) {
    erros.push({texto:'Descricao inválida!'})
  }
  if (!req.body.codigo || typeof req.body.codigo == undefined || req.body.codigo == null) {
    erros.push({texto:'Código inválido!'})
  }
  if (!req.body.numeroserie || typeof req.body.numeroserie == undefined || req.body.numeroserie == null) {
    erros.push({texto:'Numero de série inválido!'})
  }
  if (!req.body.imagem || typeof req.body.imagem == undefined || req.body.imagem == null) {
    erros.push({texto:'Imagem inválida!'})
  }
  if (erros.length > 0) {
    res.render('equipamentoviews/alteracaoview',{erros:erros})
  } else {
    Equipamento.findOne({where:{id:req.body.id}}).then((equipamento) => {
      equipamento.nome = req.body.nome
      equipamento.save().then(() => {
        req.flash('success_msg','Equipamento alterado com sucesso!')
        res.redirect('/equipamentoroutes')
      }).catch((erro) => {
        req.flash('error_msg','Não foi possível alterar o equipamento!')
        console.log(erro)
        res.redirect('/equipamentoroutes')
      })
    }).catch((erro) => {
      req.flash('error_msg','Não foi possível encontrar o equipamento!')
      console.log(erro)
      res.redirect('/equipamentoroutes')
    })
  }
})
//-------------------------------------------------------------------------------------------------
router.post('/excluirroute',isAuthenticaded,(req,res) => {
  Equipamento.destroy({where:{id:req.body.id}}).then(() => {
    req.flash('success_msg','Equipamento excluído com sucesso!')
    res.redirect('/equipamentoroutes')
  }).catch((erro) => {
    req.flash('error_msg','Não foi possível excluir o equipamento!')
    console.log(erro)
    res.redirect('/equipamentoroutes')
  })
})
//-------------------------------------------------------------------------------------------------
module.exports = router
//-------------------------------------------------------------------------------------------------