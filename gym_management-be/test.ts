import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document{
    name: string,
    email:string,
    password: string,
    target: string,
    activity: string
}

const userSchema: Schema = new Schema(
   {
     name: {type: String, required:true},
     email :{type:String,required:true, unique:true},
     password:{type:String, required:true}
   },
   {

   } 
)