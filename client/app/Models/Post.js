export default class Post {
  constructor({ title, authorImg, author, body, tags, creatorEmail, id }) {
    this.title = title
    this.authorImg = authorImg || "https://placehold.it/100x100"
    this.author = author
    this.body = body
    this.tags = tags
    this.creatorEmail = creatorEmail
    this.id = id
  }
  get postTemplate() {
    return `
    <div class="">
  <div class="mb-3 rounded p-0 d-flex">
  <div class="col-3 card">
      <div class="card-img p-2 " id="avatar"> 
        <img class="image-circle" src="${this.authorImg}" alt="">
        <div class="mt-3" id="usernameArea"> 
          <p><b>${this.author}</b></p>
        </div>
      </div>
  </div>
  <div class="col-9 card">
      <div class="card-title p-2 d-flex justify-content-between">
        <h3>${this.title}</h3>
        <span> <i class="fa fa-times-circle-o hover-red" aria-hidden="true" role="button" onclick="app.postsController.removePost('${this.id}')"></i> </span>
      </div>
      <div class="card-body border-top mb-1"> 
          ${this.body}
      </div>
      <div class="pb-1">
      <form onsubmit="app.commentsController.addComment(event,'${this.id}')">
      <label for="comment"></label>
            <input type="text" id="comment" name="comment" placeholder="Your Comment..."></input>
            <button class="btn btn-danger" type="submit">Add Comment</button>
      </form>
      <h1 onclick="app.commentsController.drawCommentsForPost('${this.id}')">comment</h1>
      <div name="commentsSection" id="${this.id}">
      </div>
  </div>
  </div>
  </div>
  `
  
  }
}