import { ProxyState } from "../AppState.js";
import Comment from "../Models/Comment.js";
import { api } from "./AxiosService.js";

let url = "api/posts/comments";

class CommentsService {

  async getComments() {
    let res = await api.get(url);
    ProxyState.comments = res.data.map((c) => new Comment(c));
  }

  async addComment(post) {
    let res = await api.post(url, post);
    ProxyState.comments = [...ProxyState.comments, new Comment(res.data)];
  }

  async removeComment(id) {
    let res = await api.delete(`/comments/${id}`);
    let index = ProxyState.comments.findIndex((c) => c.id == id)
    if(index == -1) {
      throw new Error("Invalid Id");
    }
    ProxyState.comments.splice(index, 1);
    ProxyState.comments = ProxyState.comments;
  }

}

export const commentsService = new CommentsService();