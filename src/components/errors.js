import React from 'react'

export const ErrorMessage = ({header, messages}) => (
  <div className="ui icon error message">
    <i className="warning sign icon" />
    <div className="content">
      <div className="header">
        {header}
      </div>
      <ul className="list">
        {messages.map((message, index) => <li key={index}>{message}</li>)}
      </ul>
    </div>
  </div>
)
