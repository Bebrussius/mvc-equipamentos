//-------------------------------------------------------------------------------------------------
// Módulos {{{
const express = require('express')
const handlebars = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const path = require('path')
const usuario = require('./controllers/usuariocontroller')
const equipamento = require('./controllers/equipamentocontroller')
const app = express()
// }}}
//-------------------------------------------------------------------------------------------------
// Sessão
app.use(session({
  secret:'crudapp',
  resave:true,
  saveUninitialized:true
}))
app.use(flash())
//-------------------------------------------------------------------------------------------------  
//middleware
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})
//-------------------------------------------------------------------------------------------------  
// Body Parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//-------------------------------------------------------------------------------------------------  
// Handlebars
app.engine('handlebars',handlebars.engine({
  defaultLayout:'main',
  runtimeOptions:{
    allowProtoPropertiesByDefault:true,
    allowProtoMethodsByDefault:true,
  },
  partialsDir:[
    'views/layouts/'
  ]
}))
app.set('view engine','handlebars')
//-------------------------------------------------------------------------------------------------  
// Caminho bootstrap
app.use(express.static(path.join(__dirname,'views/layouts/bootstrap')))
// }}}
//-------------------------------------------------------------------------------------------------
// Rotas {{{
app.get('/',(req,res) => {
  res.render('home')
})
//  
app.use('/usuarioroutes',usuario) // prefixo para rotas de usuario
app.use('/equipamentoroutes',equipamento) // prefixo para rotas de equipamento
//}}}
//-------------------------------------------------------------------------------------------------
// Servidor {{{
const PORT = 3000
app.listen(PORT,() => {
  console.log('Servidor rodando!')
});
//}}}
//-------------------------------------------------------------------------------------------------