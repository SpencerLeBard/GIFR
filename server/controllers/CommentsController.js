import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .get("", this.getAllComments)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.editComment)
      .delete("/:id", this.deleteCommentbyId)
  }
  
  async getAllComments(req, res, next) {
    try {
      let comments = await commentsService.find(req.query)
      res.send(comments)
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let comment = await commentsService.createComment(req.body)
      res.send(comment);
    } catch (error) {
      next(error);
    }
  }
async editComment(req, res, next){
  try {
    req.body.creatorEmail = req.userInfo.email;
    let updatedPost = await commentsService.editComment(req.body)
    res.send(updatedPost)
  } catch (error) {
    next(error)
  }
}

async deleteCommentbyId(req, res, next) {
  try {
    req.body.id = req.params.id
    req.body.creatorEmail = req.userInfo.email;
    await commentsService.deleteComment(req.params.id, req.userInfo.email)
    res.send("Successfully Delorted")
  } catch (error) {
    next(error)
  }
}

}
