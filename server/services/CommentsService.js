import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CommentsService {
  async find(query={}) {
    let comments = await dbContext.Comments.find(query);
    return comments;
  }
  async createComment(commentData) {
    return await dbContext.Comments.create(commentData)
  }
 
  async findById(id) {
    let comment = await dbContext.Comments.findById(id);
    if (!comment) {
      throw new BadRequest("Invalid Id");
    }
    return comment;
  }
}

export const commentsService = new CommentsService();