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
export default class PostsController {
  constructor() {
    this.getAllPosts()
    ProxyState.on("posts", _drawPosts);
    AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, () => {
    })
  }

  getAllPosts() {
    try {
      postsService.getAllPosts();
    } catch (error) {
      console.error(error);
    }
  }

  addPost(e) {
    debugger
    e.preventDefault();
    let form = e.target
    let newPost = {
      title: form.inputTitle.value,
      body: form.inputBody.value,
      creatorEmail: ProxyState.profile.email,
      authorImg: ProxyState.profile.picture,
      author: ProxyState.profile.name
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
