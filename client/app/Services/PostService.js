import { ProxyState } from "../AppState.js";
import Post from "../Models/Post.js";
import { api } from "../Services/AxiosService.js";

let url = "api/posts/";

class PostService {

  async getPosts() {
    let res = await api.get(url);
    ProxyState.posts = res.data.map((p) => new Post(p));
  }

  async addPost(post) {
    let res = await api.post(url, post)
  }

}

export const valuesService = new PostService();