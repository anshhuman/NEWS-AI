import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    source : {
        id : String ,
        name : String
    },
    author : String , 
    title : String ,
    description : String ,
    url : String ,
    urlToImage : String ,
    publishedAt : String ,
    content : String
});

export const Article = mongoose.model("Article",articleSchema);
    