import { ProxyState } from "../AppState.js";
import { AuthService } from "../Services/AuthService.js";
import { postsService } from "../Services/PostsService.js";

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
      postsService.addPost(newPost);
    } catch (error) {
      console.error(error);
    }
  }

  removePost(id) {
    try {
      postsService.removePost(id);
    } catch (error) {
      console.error(error);
    }
  }
}
