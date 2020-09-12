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
  <div class="container d-flex mb-3">
  <div class="col-3 card">
      <div class="card-img p-2" id="avatar"> <img src="${this.authorImg}" alt="">
          <div class="d-flex align-items-center" id="usernameArea"> ${this.author}
          </div>
          <div class="d-flex align-items-center" id="usernameArea"> score
          </div>
      </div>
  </div>
  <div class="col-9 card">
      <div class="card-title p-2">
        <h3>${this.title}</h3>
        <span> <i class="fa fa-times-circle-o" aria-hidden="true" role="button" onclick="app.postsController.removePost('${this.id}')"></i> </span>
      </div>
      <div class="card-body border-top"> 
          ${this.body}
      </div>
      <form onsubmit="app.commentsController.addComment()">
            <input type="text" id="comment" name="comment" placeholder="Your Comment...">
            <button type="submit">Add Comment</button>
      </form>
  </div>
  <div name="commentsSection" id="${this.id}">

  </div>
  </div>
  `
  }
}