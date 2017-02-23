import React from 'react'

export default () => (
  <div className="ui inverted vertical footer segment">
    <div className="ui three column stackable inverted grid container">
      <div className="center aligned column">
        <div className="ui inverted horizontal link list">
        </div>
      </div>
      <div className="center aligned column" style={{textAlign: 'center'}}>
        <div className="ui inverted horizontal link list">
          <a className="item" href="https://www.facebook.com" target="_blank">
            <i className="big facebook icon"/>
          </a>
          <a className="item" href="https://twitter.com" target="_blank">
            <i className="big twitter icon"/>
          </a>
        </div>
      </div>
    </div>
  </div>
)
