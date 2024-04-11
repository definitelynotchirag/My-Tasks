import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    tasks :{
        type: String,
        required: true,
    },
    desc : {
        type: String, 
        required :false
    }
})
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required : true,
        unique: true,
    },
    email :{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    tasklist:[taskSchema]
})

let User = mongoose.Model;
if(mongoose.modelNames().includes('users')){
    User = mongoose.model('users');
}
else{
    User = mongoose.model('users', userSchema);
}

export default User;