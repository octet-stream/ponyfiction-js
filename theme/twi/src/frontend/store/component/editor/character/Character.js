import {action} from "mobx"
import Token from "store/component/common/token/Token"
import fetch from "helper/wrapper/fetch"
import isEmpty from "lodash/isEmpty"

class Character extends Token {
  get endpoint() {
    return "http://localhost:1337/stories/characters"
  }

  @action request(token) {
    if (isEmpty(token)) {
      this.current = ""
      this.suggestions = []
      return
    }

    this.current = token

    const onFulfilled = res => this.suggestions = res

    const onRejected = err => console.error(err)

    fetch(`${this.endpoint}/${token}`)
      .then(onFulfilled, onRejected)
  }
}

export default Character
