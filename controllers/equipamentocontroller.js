//-------------------------------------------------------------------------------------------------
const express = require('express')
const router = express.Router()
const Equipamento = require('../models/equipamentomodel')
//-------------------------------------------------------------------------------------------------
router.get('/',(req,res) => {
  Equipamento.findAll().then((equipamentos) => {
    res.render('equipamentoviews/gerenciaview',{equipamentos:equipamentos})
  }).catch((erro) => {
    req.flash('erros_msg','Houve ou erro ao listar equipamentos!')
    console.log(erro)
    res.redirect('/')
  })
})
//-------------------------------------------------------------------------------------------------
router.get('/exibirinclusaoroute',(req,res) => {
  res.render('equipamentoviews/inclusaoview')
})
//-------------------------------------------------------------------------------------------------
router.post('/incluirroute',(req,res) => {
  var erros = []
  if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({texto:'Nome inválido!'})
  }
  if (erros.length > 0) {
    res.render('equipamentoviews/inclusaoview',{erros:erros})
  } else {
    Equipamento.create({
      nome:req.body.nome
    }).then(() => {
      req.flash('success_msg','Equipamento incluído com sucesso!')
      res.redirect('/equipamentoroutes')
    }).catch((erro) => {
      req.flash('erros_msg','Não foi possível incluir o equipamento!')
      console.log(erro)
      res.redirect('/equipamentoroutes')
    })
  }
})
//-------------------------------------------------------------------------------------------------
router.get('/alteracaoroute/:id',(req,res) => {
  Equipamento.findOne({where:{id:req.params.id}}).then((equipamento) => {    
    res.render('equipamentoviews/alteracaoview',{equipamento:equipamento})
  }).catch((err) => {
    req.flash('erros_msg','Não foi possível encontrar o equipamento!')
    console.log(erro)
    res.redirect('/equipamentoroutes')
  })
})
//-------------------------------------------------------------------------------------------------
router.post('/alterarroute',(req,res) => {
  var erros = []
  if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({texto:'Nome inválido!'})
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
router.post('/excluirroute',(req,res) => {
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