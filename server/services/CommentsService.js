import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CommentsService {  
  async find(query={}) {
    let comments = await dbContext.Comments.find(query);
    return comments;
  }

  async findById(id) {
    let comment = await dbContext.Comments.findById(id);
    if (!comment) {
      throw new BadRequest("Invalid Id");
    }
    return comment;
  }
  async createComment(commentData) {
    return await dbContext.Comments.create(commentData)
  }

  async editComment(update) {
    let updated = await dbContext.Comments.findOneAndUpdate({_id: update.id, creator: update.email }, update, { new: true})
    if(!updated){
      throw new BadRequest("invalid id or not authrorized")
    }
    return updated   
  }
  async deleteComment(id, email) {
    let deleted = await dbContext.Comments.findOneAndDelete({_id: id, creatorEmail: email})
    if(!deleted){
      throw new BadRequest("invaild id or not authorized!")
    }
   
  }


 
}

export const commentsService = new CommentsService();