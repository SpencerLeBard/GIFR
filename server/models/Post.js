export default class Post {
  constructor({ title, authorImg, author, body, tags, creatorEmail }) {
    this.title = title
    this.authorImg = authorImg
    this.author = author
    this.body = body
    this.tags = tags
    this.creatorEmail = creatorEmail
  }
}