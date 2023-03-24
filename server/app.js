const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect("mongodb+srv://words:newWords@cluster0.0jm7tmy.mongodb.net/?retryWrites=true&w=majority");


const newWords = new mongoose.Schema({
    word: String,
    meaning: String
});
const Words = mongoose.model("Words", newWords);

app.get("/register",async (req,res)=>{
    const allWords = await Words.find({});

    res.send({data: allWords});
})
app.post("/register",async function(req,res){
    const {word, meaning} = req.body;
    const newW = new Words({
        word,
        meaning
    });
   await newW.save();
    res.status(201).json({message: "hello world"});
});


app.listen(5000, function () {
    console.log("port running at 5000");
});