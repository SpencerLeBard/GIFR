import { ProxyState } from "../AppState.js";
import Comment from "../Models/Comment.js";
import { api } from "./AxiosService.js";


class CommentsService {

  async getComments(id) {
    let res = await api.get("posts/" + id + '/comments');
    ProxyState.comments = res.data.map((c) => new Comment(c));
  }

  async addComment(post) {
    let res = await api.post("comments", post);
    ProxyState.comments = [...ProxyState.comments, new Comment(res.data)];
  }

  async removeComment(id) {
    let res = await api.delete(`comments/${id}`);
    let index = ProxyState.comments.findIndex((c) => c.id == id)
    if (index == -1) {
      throw new Error("Invalid Id");
    }
    ProxyState.comments.splice(index, 1);
    ProxyState.comments = ProxyState.comments;
  }

  // async upvote() {

  // }

  // async downvote() {

  // }

}

export const commentsService = new CommentsService();