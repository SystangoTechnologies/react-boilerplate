import React from 'react'
import {dismissMessage} from '../../models/messages'
import MessageBlock from './MessageBlock'

const MessagesList = ({ messages, dispatch }) => (
  messages.length === 0 ? <div></div> : <div>
    {messages.map(message => (
      <MessageBlock key={message.id} type="success" header={message.title} onDismiss={() => dispatch(dismissMessage(message.id))}>
        <p>{message.text}</p>
      </MessageBlock>
    ))}
  </div>
)

export default MessagesList
