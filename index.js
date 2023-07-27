const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const mongoose = require('mongoose');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
mongoose.connect('mongodb://127.0.0.1:27017/quote').
then(()=>{
    console.log('DB CONNECTED');})
.catch((err)=>{
    console.log('error');
})
const quoteSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    quote:{
        type:String,
        trim:true,
    }
})

const Quote = mongoose.model('Quote',quoteSchema);
const quotes = [
    {
        name:'Madara Uchiha',
        quote:'Wake up to Reality'
    },{
        name:'Monkey D luffy',
        quote:'I am gonna become the king of the pirates'
    },{
        name:'Barbie',
        quote:'I am a barbie girl welcome to barbie world'
    },{   
        name:'test',
        quote:'test quote'
    }
];

let obj = Quote.find({name:'test'});
if(!obj)Quote.insertMany(quotes);

app.get('/',async (req,res)=>{
    let quotesD = await Quote.find({});
    res.render('index',{quotesD});
})



app.get('/new',(req,res)=>{
    res.render('new');
})
app.post('/',async (req,res)=>{
    let{name,quote} = req.body;
    await Quote.create({name,quote});
    res.redirect('/');
})
app.get('/show/:id',async (req,res)=>{
    let {id}=req.params;
    let found = await Quote.findById(id);
    res.render('show',{found})
})











app.listen(port,(err)=>{
    if(err){
        console.log("error !!");
        return;
    }
    console.log(`app running at ${port}`);
})