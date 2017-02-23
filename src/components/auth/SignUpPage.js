/* global $*/
import React from 'react'
import {connect} from 'react-redux'
import SignUpUserForm from './SignUpUserForm'
import {push} from 'react-router-redux'

const SignUpPage = React.createClass({
  getInitialState () {
    return ({
      showErrorPopup: false,
      error_message: null
    })
  },
  // on url load, first we dispatch an action
  componentWillMount () {
    console.log('SignUpPage.componentWillMount')
  },
  componentDidMount () {
    console.log('SignUpPage.componentDidMount')
  },
  closeErrorPopup () {
    this.setState({showErrorPopup: false, error_message: null})
  },
  render () {
    return (
      <div>
      <SignUpUserForm onSubmit={(values) => this.props.signUpRequest(values)} onClosed={this.props.onClosed} />
      {this.state.showErrorPopup && <ErrorPopup message={this.state.error_message} onClosed={this.props.onClosed} Error={this.state.showErrorPopup} />}
      </div>
    )
  }
})

const ErrorPopup = React.createClass({
  render () {
    return (
      <div className="ui modal tiny text-center ">
        <div className="ui top attached message">
          <h2>Dashboard</h2>
        </div>
        <div className="ui middle attached segment">
          <p>{this.props.message}</p>
        </div>
      <div className="ui bottom attached segment">
          <button className="ui primary button" onClick={this.props.onClosed}>Ok</button>
        </div>
      </div>
    )
  },
  componentDidMount () {
    $('.ui.modal')
      .modal({
        detachable: false,
        closable: true
      })
      .modal('show')
  },
  componentWillUnmount () {
    const isActive = $('.ui.modal').modal('is active')
    if (isActive) {
      $('.ui.modal').modal('hide')
    }
  }
})

export default connect(state => ({
}), dispatch => ({
  signUpRequest: (values) => dispatch(push('/loginSent')),
  onClosed: () => dispatch(push('/login'))
}))(SignUpPage)
