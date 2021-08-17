const express = require("express");
//const mongoose = require("mongoose");
const https = require('http2')
const http =require('http')
const fs = require('fs');

// const flash = require("connect-flash");
// const session = require("express-session");

//import from emailSchema
const emailSchema = require("./models/email");

const app = express();
const PORT = process.env.PORT || 5000;

//email WIP TODO
//const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

//con mongodb
/*
mongoose.connect("mongodb://localhost/tcc", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//connect-flash conf
// app.use(
//   session({
//     secret: "secret",
//     saveUninitialized: true,
//     resave: true,
//   })
// );
// app.use(flash());
// app.use((req, res, next) => {
//   res.locals.aviso = req.flash("aviso");
//   res.locals.error = req.flash("error");
//   next();
// });
const dirPrimeiroPainel = "./public/carousel-1";
//array de fotos da galeria
let fotoPrimeiroPainel;
fs.readdir(dirPrimeiroPainel, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    //files passa um array com os nomes das fotos
    fotoPrimeiroPainel = files;
    //console.log(arrayfotos)
  }
});
const dirSegundoPainel = "./public/carousel-2";
//array de fotos da galeria
let fotoSegundoPainel;
fs.readdir(dirSegundoPainel, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    //files passa um array com os nomes das fotos
    fotoSegundoPainel = files;
    //console.log(arrayfotos)
  }
});

//nav
app.get("/", (req, res) => {
  res.render("index.ejs", {
    fotoPrimeiroPainel: fotoPrimeiroPainel,
    dir1: "carousel-1",
    fotoSegundoPainel: fotoSegundoPainel,
    dir2: "carousel-2",
    //aviso: req.flash("aviso"),
    //error: req.flash("error"),
  });
});

app.get("/politica", (req, res) => {
  res.render("politica");
});

app.get("/faq", (req, res) => {
  res.render("faq");
});

app.get("/localizacao", (req, res) => {
  res.render("localizacao");
});

app.get("/vesti", (req, res) => {
  res.redirect("https://milvest.vesti.mobi");
});

app.get("/vestiapp", (req, res) => {
  res.redirect("https://milvest.vesti.mobi/app");
});

/*

app.post("/email", (req, res) => {
  let avisos = [];
  let error = [];
  if (req.body.email === "" || !emailRegex.test(req.body.email)) {
    avisos.push({ aviso: "Por favor colocar um email válido" });
  } else if (req.body.msg === "") {
    error.push({ email: req.body.email });
  }
  if (req.body.msg === "") {
    avisos.push({ aviso: "Por favor preencher o campo de mensagem" });
  } else if (req.body.email === "") {
    error.push({ msg: req.body.msg });
  }
  if (avisos !== "") req.flash("aviso", avisos);
  if (error !== "") req.flash("error", error);
  avisos = [];
  error = [];
  res.redirect("/");
});

*/

//sitemap xml
app.get("/sitemap.xml", (req, res) => {
  res.sendFile("/sitemap.xml");
});

//robots.txt
app.get("/robots.txt", (req, res) => {
  res.sendFile("robots.txt");
});

//ganbi para errors 404 500
app.get("*", (req, res) => {
  res.render("404");
});

//server conf
// app.listen(PORT, function () {
//   console.log(`App is up on port ${PORT}`);
// });

// http.createServer(function(req, res) {   
//   res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
//   res.end();
// }).listen(80);

https.createServer({ 
  key: fs.readFileSync("/etc/letsencrypt/archive/milvest.com.br/privkey1.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/archive/milvest.com.br/fullchain1.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/archive/milvest.com.br/chain1.pem")
}, app).listen(PORT);