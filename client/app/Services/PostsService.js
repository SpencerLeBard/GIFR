import { ProxyState } from "../AppState.js";
import Post from "../Models/Post.js";
import { api } from "./AxiosService.js";

let url = "/posts";

class PostsService {
  async getAllPosts() {
    let res = await api.get(url);
    ProxyState.posts = res.data.map((p) => new Post(p));
    console.log(res);
  }

  async addPost(post) {
    let res = await api.post(url, post);
    ProxyState.posts = [...ProxyState.posts, new Post(res.data)];
  }

  async removePost(id) {
    let res = await api.delete(`${url}/${id}`);
    let index = ProxyState.posts.findIndex((p) => p.id == id)
    if (index == -1) {
      throw new Error("Invalid Id");
    }
    ProxyState.posts.splice(index, 1);
    ProxyState.posts = ProxyState.posts;
  }

}

export const postsService = new PostsService();