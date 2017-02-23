import React from 'react'
import {connect} from 'react-redux'
import AuthLayout from './AuthLayout'

const LoginSentPage = ({location, dispatch}) => (
  <AuthLayout>
    <div className={'ui top attached message'}>
      <div className="header">Secure Login Key Sent</div>
    </div>
    <div className="ui attached fluid segment">
      <p>Thank You for subscribing.</p>
    </div>
  </AuthLayout>
)
export default connect(state => ({}))(LoginSentPage)
