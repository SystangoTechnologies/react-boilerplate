import React from 'react'

export default ({children}) => (
  <div className="ui centered grid">
    <div className="sixteen wide mobile eight wide tablet eight wide computer column">
      {children}
    </div>
  </div>
)
