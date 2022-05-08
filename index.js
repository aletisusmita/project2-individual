const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const  {default:mongoose}  = require('mongoose');
const moment = require("moment");
const router = require('./routes/route.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://function-up:As%40142000@functioup.arkly.mongodb.net/susmita", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use(
    function(req,res,next){
        console.log(moment().format('LLLL'),req.ip,req.url)
        next()
    }
    
);
app.use('/', route);


app.listen(process.env.PORT || 3000, function () { 
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});