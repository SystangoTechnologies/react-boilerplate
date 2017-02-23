import React, {PropTypes} from 'react'
import {reduxForm, propTypes} from 'redux-form'
import {EmailField, PhoneFieldWithoutCountryCode, CountryCode} from './../forms'
import {sendLoginRequest, loginMethodChanged, tryAgain} from '../../models/auth'
import AuthLayout from './AuthLayout'
import {push} from 'react-router-redux'

const loginForm = reduxForm({
  form: 'login',
  fields: ['email', 'phone', 'country_code']
},
  state => ({
    initialValues: {
      email: '',
      phone: '',
      country_code: '1'
    }
  }),
  dispatch => ({
     onSubmit: (values) => dispatch(sendLoginRequest(values))
    .then(_ => dispatch(push('/loginSent')))
    .catch(err => dispatch(push({pathname: '/loginSent', state: {values: values}})).then(console.log(err))),
    onTryAgain: () => dispatch(tryAgain()),
    onSignupSubmit: (values) => dispatch(push('/signup'))
  })
)

const LoginButton = props => {
  const buttonClass = props.submitting ? 'loading' : ''
  return <div className={`ui fluid blue submit ${buttonClass} button`} onClick={props.values.email !== '' || props.values.phone !== '' ? props.handleSubmit : ''}>Log In</div>
}
const SignupButton = props => {
  const buttonClass = props.submitting ? 'loading' : ''
  return <div className={`ui fluid blue submit ${buttonClass} button`} onClick={props.onSignupSubmit}>Sign Up</div>
}
const LoginByEmail = props => (
  <div className="ui attached fluid segment">
    <EmailField {...props.fields.email} label="Your Email"/>
    {props.fields.email.touched && props.fields.email.value === '' && <div className="ui pointing red basic label">Required</div>}
    <LoginButton {...props} />
    <div className="ui hidden divider"></div>
    <SignupButton {...props} />
  </div>
)

const LoginForm = React.createClass({
  propTypes: {
    ...propTypes,
    title: PropTypes.string
  },
  render () {
    return (
      <form className={'ui form'} onSubmit={this.props.handleSubmit}>
        <div className={'ui top attached message'}>
          <div className="header">{this.props.title}</div>
        </div>
        <LoginByEmail {...this.props}/>
      </form>
    )
  }
})

const LoginPage = React.createClass({
  componentWillMount () {
    console.log('LoginPage.componentWillMount')
  },
  componentDidMount () {
    console.log('LoginPage.componentDidMount')
  },
  render: function () {
    return (
      <AuthLayout>
        <LoginForm title="Log" {...this.props}/>
        <div style={{textAlign: 'center'}}>
          <div className="ui horizontal divider"></div>
        </div>
      </AuthLayout>
    )
  }
})

export default loginForm(LoginPage)
