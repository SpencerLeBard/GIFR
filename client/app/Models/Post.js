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
  <div class="col-3 card">
      <div class="card-img p-2" id="avatar"> <img src="${this.authorImg}" alt="">
          <div class="d-flex align-items-center" id="usernameArea"> ${this.author}
          </div>
          <div class="d-flex align-items-center" id="usernameArea"> score
          </div>
      </div>
  </div>
  <div class="col-9 card">
      <div class="card-title p-2">title
          <div class="card-body border-top"> 
          ${this.body}
          </div>
      </div>
  </div>
  `
  }
}