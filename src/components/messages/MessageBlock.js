import React from 'react'

const MessageBlock = ({ type, header, onDismiss, children }) => {
  return (
    <div className={`ui ${type || ''} message`} style={{marginBottom: '1rem'}}>
      { onDismiss &&
        <i className="close icon" onClick={onDismiss}/>
      }
      { header &&
        <div className="header">
          {header}
        </div>
      }
      {children}
    </div>
  )
}

export default MessageBlock
