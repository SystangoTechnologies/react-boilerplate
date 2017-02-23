import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './../components/App'
import LoginPage from './../components/auth/LoginPage'
import SignUpPage from './../components/auth/SignUpPage'
import LoginSentPage from './../components/auth/LoginSentPage'

const EmptyPage = () => <div></div>

export const routes = (
  <Route component={App}>
    <Route path="/empty" component={EmptyPage}/>
    <Route path="/loginSent" component={LoginSentPage}/>
    <Route path="/signup" component={SignUpPage}/>
    <Route path="/login" component={LoginPage}/>
    <Route path="/" component={LoginPage}>
      <IndexRoute component={App}/>
    </Route>
  </Route>
)
