import { Document, model, models, Schema } from "mongoose";

export interface IImage extends Document{
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string; // Mongoose URL type maps to string
  width?: number;
  height?: number;
  config?: object; // Or a more specific config type
  transformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author?:{
    _id:string,
    firstName:string,
    lastName:string
  }; // Or populated User type if populated
  createdAt?: Date;
  updatedAt?: Date;
}


const ImageSchema = new Schema({
    title:{type:String, required:true},
    transformationType:{type:String, required:true},
    publicId:{type:String , required:true},
    secureURL:{type:String , required:true},
    width:{type:Number},
    height:{type:Number},
    config:{
        type:Object
    },
    transformationUrl:{type:String},
    aspectRatio:{type:String},
    color:{type:String},
    prompt:{type:String},
    author:{type:Schema.Types.ObjectId, ref:'User'},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}
})

const Image =models?.Image || model('Image',ImageSchema)

export default Image