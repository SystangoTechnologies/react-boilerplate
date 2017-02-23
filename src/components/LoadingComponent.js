import React from 'react'
import {ErrorMessage} from './errors'

export const Loading = ({ message = 'Loading' }) => (
  <div className="ui basic segment" style={{height: '100%', width: '100%', minHeight: '10rem'}}>
    <div className="ui active inverted dimmer">
      <div className="ui text loader">{message}</div>
    </div>
  </div>
)

const ErrorLoading = ({ message }) => (
  <ErrorMessage header="There was an error loading data" messages={[message]}/>
)

export default ({ completed, error, children, message, items }) => (
  <div>
    {
      (completed || items)
        ? (error ? <ErrorLoading message={toErrorMessage(error)}/> : children)
        : <Loading message={message}/>
    }
  </div>
)

function toErrorMessage (err) {
  if (err.body && err.body.error) {
    return err.body.error
  } else {
    return err.toString()
  }
}
