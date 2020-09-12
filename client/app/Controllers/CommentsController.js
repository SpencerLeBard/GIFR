import { ProxyState } from "../AppState.js";
import { AuthService } from "../Services/AuthService.js";
import { commentsService } from "../Services/CommentsService.js";

//Private
function _drawComments() {
    let template = "";
    ProxyState.comments.forEach((p) => (template += p.commentTemplate));
    document.getElementById("comments").innerHTML = template;
}
//Public
export default class CommentsController {
    constructor() {
        this.getAllComments()
        AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, () => {
            ProxyState.on("comments", _drawComments);
        })
    }

    getAllComments() {
        try {
            commentsService.getAllComments();
        } catch (error) {
            console.error(error);
        }
    }

    addComment(e) {
        e.preventDefault();
        let form = e.target
        let newComment = {
            description: form.comment.value,
        };
        form.reset();
        try {
            commentsService.addComment(newComment);
        } catch (error) {
            console.error(error);
        }
    }

    removeComment(id) {
        try {
            commentsService.removeComment(id);
        } catch (error) {
            console.error(error);
        }
    }
}