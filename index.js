const { count } = require("console");
const express = require("express");
const { Admin } = require("mongodb");
const app = express()
const path = require('path');
const MongoClient=require('mongodb').MongoClient
app.use(express.json())
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, '/public')));
var totalStds;
var totalFac;
var semesterStds;
var allStds;
var allInsc;
var admin;
    MongoClient.connect('mongodb://0.0.0.0:27017/',{useNewUrlParser:true , useUnifiedTopology: true},function(error,result){
        if (error )throw error
        database=result.db("CSE_Management")
        console.log("CONNECTION")
        database.collection("admin").findOne({},function(error,result){
            if (error )throw error;
            admin=result
            console.log(admin);
        })
        let stds=database.collection("students");
        stds.count().then((count)=>{
            console.log(count);
            totalStds=count;            
        })
        let fac=database.collection("instructors");
        fac.count().then((count)=>{
            console.log(count);
            totalFac=count;            
        })
        
        database.collection("students").find({semester:"Semester 1"}).toArray(function(error,result){
            if(error) throw error;
            allStds=result;  
            console.log(allStds);   
        });
        
        database.collection("instructors").find({}).toArray(function(error,result){
            if(error) throw error;
            allInsc=result;
            console.log(allInsc);

        });
    
    })

app.get('/home', (req, res) => {
    res.render("home",{totalStds:totalStds, totalFac:totalFac})
})

app.get('/login', (req, res) => {
    res.render("login",{admin:admin})
})
app.get('/enrolledSts', (req, res) => {
    res.render("enrolledSts")
})
app.get('/stsDetails', (req, res) => {
    res.render("stsDetails",{allStds:allStds})
})
app.get('/attendance', (req, res) => {
    res.render("attendance")
})
app.get('/News', (req, res) => {
    res.render("News")
})
app.get('/dashboard', (req, res) => {
    res.render("dashboard")
})
app.get('/faculty', (req, res) => {
    res.render("faculty",{allInsc:allInsc})
})

app.listen(5800, function () {
    console.log(`Express listening to port 5500`)
})