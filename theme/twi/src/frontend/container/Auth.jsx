import React from "react"
import {Provider} from "mobx-react"
import DocumentTitle from "react-document-title"
import login from "store/Login"

import Root from "./Root"

const stores = {
  login
}

class Auth extends Root {
  render() {
    const {width, height} = this.state

    return (
      <DocumentTitle title={this.state.title}>
        <Provider {...stores}>
          <div style={{width, height}}>
            {this.props.children}
          </div>
        </Provider>
      </DocumentTitle>
    )
  }
}

export default Auth