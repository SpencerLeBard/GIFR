import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const Comment = new Schema(
  {
    creatorEmail: { type: String, required: true },
    body: { type: String, required: true },
    post: { type: ObjectId, ref: "Post", required: true},
    author: { type: String, required: true},
    vote: { type: Number, default: 0 } 

  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Comment.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Comment;
