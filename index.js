const express = require('express');
const path = require('path');
const app = express()
 
const cookieParser = require('cookie-parser')

const helmet = require('helmet');
app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use((req, res, next) => {
    if(req.query.msg === 'fail'){
        res.locals.msg = 'Sorry, this username and password combination does not exists.'
    }else{
        res.locals.msg = ''
    }
    next()
})

app.get('/', (req, res, next) => {
    res.send("Security Chek");
});

app.get('/login', (req, res, next) => {
    console.log(req.query)
    res.render('login');
});

app.post('/process_login', (req, res, next) => {
   const username = req.body.username;
   const password = req.body.password;

   if(password === 'x'){
       res.cookie('username', username);
       res.redirect('welcome');
   }else {
        res.redirect('/login?msg=fail&txt=Hello');
   }
//    res.json(req.body);
})


app.get('/welcome', (req, res, next) => {
    res.render('welcome', {
        username: req.cookies.username
    });
});
app.param('id', (req, res, next, id) => {
    console.log('params called', id)
    next()
})

app.get('/story/:storyID', (req, res, next) => {
    res.send('<h1>Story '+ req.params.storyID +'</h1>')
})

app.get('/story/:storyID/:link', (req, res, next) => {
    console.log(req.params)
    res.send('<h1>Story '+ req.params.storyID +' and its link is : '+ req.params.link +'</h1>')
})

app.get('/statement', (req, res, next) => {
    res.download(path.join(__dirname, 'statement/statement.png'), 'Faruk_statement.png', (error) => {
        console.log(error)
    })
})

app.get('/logout', (req, res, next) => {
    res.clearCookie('username');
     res.redirect('/login');
})
app.listen(3000, () => {
    console.log(`Server started on port 3000!`);
});
