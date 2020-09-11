import { AuthController } from "./Controllers/AuthController.js";
import PostController from "./Controllers/PostController.js";

class App {
  authController = new AuthController();
  postController = new PostController();
}

window["app"] = new App();
