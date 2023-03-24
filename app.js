require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);
const connectDB = async () =>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
     console.log(`MongoDB Connected : ${conn.connect.host}`);
  }catch(error){
    console.log(error);
    process.exit(1);
  }
}



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

// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", (req,res) => {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function () {
    console.log(`port running at ${PORT}`);
    connectDB();
});