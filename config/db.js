const mongoose= require("mongoose")

const connectDB=async ()=>{
try{
const connection= await mongoose.connect(
  "mongodb+srv://Giri_Chandan:Giri_Chandan@database.k6hvkmd.mongodb.net/learnFlow?retryWrites=true&w=majority",
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
);
}
catch (error){
console.log("error");
process.exit(1);
}
}
module.exports=connectDB;

