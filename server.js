/**
 * Created by BaTmAn on 6/16/17.
 */

const express = require('express');
const hbs = require('hbs');

const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((request,response,next)=>{
   var now = new Date().toString();
   var log = `${now}: ${request.method} ${request.url}`;
   console.log(log);
   fs.appendFile('serverLog',log + '\n',(error)=>{
       if (error){
           console.log("Error Encountered");
       }
   });
   next();
});


// app.use((request,response,next)=>{
//     response.render('maintainence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    //return new Date().getFullYear();
    return 'You Suck';
});


app.get('/',(request,response)=>{
    //response.send("<h1>My Love is gone!</h1>");
    response.render('home.hbs',{
        pageTitle : 'Revanth',
        welcomeMessage : `Welcome Revanth`
    })
});

app.get('/about',(request,response)=>{
   response.render('about.hbs',{
       pageTitle : 'Revanth'
   });
});

app.get('/bad',(request,response)=>{
   response.send({
       errorMessage : "Error Occured"
   })
});

app.listen(3000);