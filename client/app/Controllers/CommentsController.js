import { ProxyState } from "../AppState.js";
import { AuthService } from "../Services/AuthService.js";
import { commentsService } from "../Services/CommentsService.js";

let activePostId = ""

function _draw(){
  let template = "";
  ProxyState.comments.forEach((p) => template += p.commentTemplate);
  document.getElementById(activePostId).innerHTML = template;
}

 export default class CommentsController {
  constructor() {
    AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, () => {
    })
    ProxyState.on("comments", _draw )
  }    //needs to call all comments belonging to current post
  drawCommentsForPost(id) {
    try {
      activePostId = id
      commentsService.getComments(id);
    } catch (error) {
      console.error(error);
    }

  }    //needs to add comment to current post
  addComment(e, id) {
    let postId = id
    e.preventDefault();
    let form = e.target
    let newComment = {
      body: form.comment.value,
      creatorEmail: ProxyState.profile.email,
      author: ProxyState.profile.name,
      post: postId
    };
    form.reset();
    try {
      commentsService.addComment(newComment);
    } catch (error) {
      console.error(error);
    }
  }    //needs to delete from current post
  deleteComment(id) {
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