const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://rominagh:Leoblomman14@my-app-project.n5y9c.mongodb.net/my-database?retryWrites=true&w=majority'
const User = require('./schema');

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(()=>{
    console.log(`successfully connected`);
    
    }).catch((error) => {
    console.log(error)
    })
    
app.use(express.json());
app.use(cors());


app.get('/register', (req, res, next) => {
    res.send("register")
})

app.post('/register', (req, res) => {

    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })
    

    newUser.save()

    console.log(req.body)

});

app.get('/login', (req, res, next) => {
    res.send("login")
})

app.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, (error, user) => {
        if (user) {
            if (password === user.password) {
                res.send({message: "Du är inloggad"})
            } else {
                res.send({message: 'Fel användarnamn eller lösenord'})
            }

        } else {
            res.send({message: "Fel användarnamn eller lösenord"})
            
        }
    })

})






app.listen(8080, function() {

    console.log("listening to 8080")

})


