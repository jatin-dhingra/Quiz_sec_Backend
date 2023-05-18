const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ivserdb');
  console.log("db connected");

}

const userData = new mongoose.Schema({
    name: String,
    email:String,
    phone:String,
    token:String,
    score:Number
});

const User = mongoose.model('User', userData);

console.log("checking commit");


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



app.post('/quiz',async(req,res)=>{

    let user=new User();
    user.name=req.body.name;
    user.email=req.body.email;
    user.phone=req.body.phone;
    user.token=req.body.token;
    user.score=req.body.score;

    const docs=await user.save();
    console.log(docs)
    res.json(docs);
})

 

app.listen(8000,(req,res)=>{
    
    console.log('listening on 8080');
})
