import { ProxyState } from "../AppState.js";
import { AuthService } from "../Services/AuthService.js";
import { PostService } from "../Services/PostService.js";

//Private
function _drawPosts() {
  let template = "";
  ProxyState.posts.forEach((p) => (template += p.postTemplate));
  document.getElementById("posts").innerHTML = template;
}
//Public
export default class PostController {
  constructor() {
    AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, () => {
      ProxyState.on("todos", _drawPosts);
    })
  }

  addPost(e) {
    e.preventDefault();
    let form = e.target
    let newPost = {
      description: form.post.value,
    };
    form.reset();
    try {
      PostService.addPost(newPost);
    } catch (error) {
      console.error(error);
    }
  }

  removePost(id) {
    try {
      PostService.removePost(id);
    } catch (error) {
      console.error(error);
    }
  }
}
