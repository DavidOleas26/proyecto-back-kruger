import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  flatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'flats',
    required: [true, 'Flat ID is required'],
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'Sender ID is required'],
  },
  content: {
    type: String,
    maxlength: [500, 'Comments must have a maximum of 500 characters'],
    required: [true, 'Comment is required'],
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments',
    default: null, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

export const Comment = mongoose.model("comments", commentSchema)