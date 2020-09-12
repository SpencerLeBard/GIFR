import { ProxyState } from "../AppState.js";
import { AuthService } from "../Services/AuthService.js";
import { commentsService } from "../Services/CommentsService.js";


function _drawComments() {
  let template = "";
  ProxyState.comments.forEach((p) => template += p.commentTemplate);
  document.getElementById(`${this.post}`).innerHTML = template;
} export default class CommentsController {
  constructor() {
    this.getComments()
    AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, () => {
      ProxyState.on("comments", _drawComments);
    })
  }    //needs to call all comments belonging to current post
  getComments() {
    try {
      commentsService.getComments();
    } catch (error) {
      console.error(error);
    }
  }    //needs to add comment to current post
  addComment(e) {
    e.preventDefault();
    let form = e.target
    let newComment = {
      body: form.inputBody.value,
      creatorEmail: ProxyState.profile.email,
      author: ProxyState.profile.name
    };
    form.reset();
    try {
      commentsService.addComment(newComment);
    } catch (error) {
      console.error(error);
    }
  }    //needs to delete from current post
  removeComment(id) {
    try {
      commentsService.removeComment(id);
    } catch (error) {
      console.error(error);
    }
  }    // upvote(id) {
  //     try {
  //         commentsService.upvote(id);
  //     } catch (error) {
  //         console.error(error)
  //     }
  // }    // downvote(id) {
  //     try {
  //         commentsService.downvote(id);
  //     } catch (error) {
  //         console.error(error)
  //     }
  // }
}