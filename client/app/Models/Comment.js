export default class Comment {
  constructor({ author, body, id, post, vote }) {
    this.author = author
    this.body = body
    this.id = id
    this.post = post
    this.vote = vote
  }

  get commentTemplate(){
    return `
    <div class="row">
    <div class="col-12 card border-dark">${this.body}</div>
  </div>
  `
  }
}