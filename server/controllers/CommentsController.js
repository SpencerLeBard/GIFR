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
      .post("", this.create);
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
}
