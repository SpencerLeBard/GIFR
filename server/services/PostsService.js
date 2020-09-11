import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class PostsService {
  async  getAllPosts(query) {
    let posts = await dbContext.Posts.find(query)
    return posts
  }
  
  async getUserPosts(email) {
    let posts = await dbContext.Posts.find({ creatorEmail: email })
    return posts
  }
  
  async createPost(body) {
    let post = await dbContext.Posts.create(body)
    return post
  }
  
  async editPost(body) {
    let editedPost = await dbContext.Posts.findOneAndUpdate({id: body.id, creator: body.creatorEmail}, body, {new:true})
    if(!editedPost){
      throw new BadRequest("invalid id or not authorized")
    }
    return editedPost
  }
  async deletePost(id, email) {
      let deletedPost = await dbContext.Posts.findOneAndDelete({_id:id, creatorEmail: email})
      if(!deletedPost) {
        throw new BadRequest("invalid ID or not authorized")
      }
  }
  


}

export const postsService = new PostsService();