import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import AuthLayout from './AuthLayout'

const LoginRequestedPage = ({location, dispatch}) => (
  <AuthLayout>
    <div className={'ui top attached message'}>
      <div className="header">Your login link expired</div>
    </div>
    <div className="ui attached fluid segment">
      <p>We have sent you a new login link to this email address:</p>
      <p style={{textAlign: 'center', fontWeight: 'bold'}}>{location.query.email}</p>
      <p>Please check your email a click on that link to login.</p>
    </div>
    <div className="ui bottom attached blue button" onClick={() => dispatch(push('/login'))}>
      Login with different email
    </div>
  </AuthLayout>
)
export default connect(state => ({}))(LoginRequestedPage)
