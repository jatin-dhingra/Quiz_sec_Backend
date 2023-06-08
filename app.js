const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ivserdb');
  console.log("db connected");

}

const userData = new mongoose.Schema({
    name: String,
    email:String,
    phone:String,
    admin:String,
    score:Number,
    attempt:Number
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
    user.admin=req.body.admin;
    user.score=req.body.score;
    user.attempt=req.body.attempt;

    const docs=await user.save();
    console.log(docs)
    res.json(docs);
})


app.get('/admin',async(req,res)=>{
    try{
        const allUser=await User.find({});
        res.send({status:"ok",data:allUser});
    }
    catch(e){
        console.log(e);
    }
    
})


const loginSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const loginCollection=mongoose.model("loginCollection",loginSchema)


app.get('/emplogin',cors(),(req,res)=>{

    console.log('hello from new emp');
})

app.post('/emplogin',async(req,res)=>{
    const {email,password}=req.body;

    try{
        const check=await loginCollection.findOne({email:email,password:password});
        console.log(check);
        
        if(check)
        {
            res.json("exist");
        }
        else{
            res.json("notexist")
        }
    }
    catch(e){
        res.json("notexist")
    }
})
 




app.post('/newemp',async(req,res)=>{
    const {email,password}=req.body;

    const data={
        email:email,
        password:password
    }
    console.log(data);
    try{
        const check=await loginCollection.findOne({email:email});
        if(check)
        {
            res.json("exist");
        }
        else{
            res.json('notexist')
            await loginCollection.insertMany([data]);
        }
    }
    catch(e){
        res.json("notexist")
    }
})



app.listen(8000,(req,res)=>{
    
    console.log('listening on 8080');
})
