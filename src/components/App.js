import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {requestPending} from '../models/requests'
import MessagesList from './messages/MessagesList'
import ApplicationMessages from './messages/ApplicationMessages'
import Footer from './app/Footer'
import styles from './App.css'

require('./semantic-ui-overrides.css')

export const App = React.createClass({
  getInitialState () {
    return {
      exist: true
    }
  },

  render () {
    return (
      <div className={styles.app}>
        <div className={styles.content}>
          <div className="ui container">
              <ApplicationMessages/>
            <MessagesList {...this.props}/>
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
})

export default connect(state => ({
  requestPending: requestPending(state.requests),
  messages: state.messages
}))(App)
