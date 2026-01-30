import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  bookmarkId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  url: {
    type: String,
    required: true
  },
  title: String,
  description: String
}, { _id: false });

const readingHistorySchema = new mongoose.Schema({
  historyId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  url: {
    type: String,
    required: true
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: {type : String},
    email: {type: String },
    password:{type: String},
    preferences:[String],
    bookMarks:[bookmarkSchema],
    readingHistory : [readingHistorySchema]
});

const User = mongoose.model('Client' , userSchema);
export default User;