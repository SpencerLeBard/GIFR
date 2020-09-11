import { AuthController } from "./Controllers/AuthController.js";
import PostController from "./Controllers/ValuesController.js";

class App {
  authController = new AuthController();
  PostController = new PostController();
}

window["app"] = new App();
