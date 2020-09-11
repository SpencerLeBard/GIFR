import Post from "./Models/Post.js"
import Value from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  user = {}
  profile = {}
  /** @type {Value[]} */
  values = []
  posts = [new Post{ title: "Test", authorImg: "https://placehold.it/100x100", author: "testy testington", body: "Test", tags: "test", creatorEmail: "test@test.com", id: "123test"}]
}



export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
