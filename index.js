const express = require('express');
const hbs = require('hbs');
 var app =  express();
const fs = require('fs')
 //Middleware


 hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('upperCase' ,(text)=>{

    return text.toUpperCase();
})
 app.set('view engine', 'hbs')

app.use((req,res,next)=>{
    var now = new Date().toString();
   var log=(`${now} : ${req.method} : ${req.url}`);
    fs.appendFile('log.txt', log + '\n' ,(err)=>{
        if(err){
            console.log('Unable to write the log')
        }
    })

next();

})


app.use('/about',(req,res,next)=>{
    
    fs.appendFile('log.txt' , 'someOne hit about tab \n',(err)=>{
        if(err){
            console.log('Unable to write the file')
        }
    });
    next();
})


 app.use(express.static(__dirname +'/public'))

//  app.get('/',(req,res)=>{
//     res.send('<h1>Express Server</h1>')
//  });
app.get('/',(req,res)=>{
    //res.send('This is Express home')

    res.render('home.hbs',{
        name:'Zeshan',
        likes:[
            'Biking',
            'Chating'

        ]
    })
})




app.get('/about',(req,res)=>{
    res.render('about.hbs' ,{
        pageTitle: 'AboutPage',
        // currentYear: new Date().getFullYear(),
})
})


 app.listen(3000);
 

