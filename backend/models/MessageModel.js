import mongoose from "mongoose";

const MessageModel = mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    content:{type:String,trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:'Chat'},
},{
    timeStamps:true,
});

export default mongoose.model("Message",MessageModel);
