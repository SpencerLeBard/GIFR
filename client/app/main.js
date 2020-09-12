import { AuthController } from "./Controllers/AuthController.js";
import PostsController from "./Controllers/PostsController.js";
import CommentsController from "./Controllers/CommentsController.js"

class App {
  commentsController = new CommentsController()
  authController = new AuthController();
  postsController = new PostsController();
}

window["app"] = new App();
