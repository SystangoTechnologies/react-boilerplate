import React from 'react'
import {reduxForm} from 'redux-form'
import {CheckboxField, PhoneFieldWithoutCountryCode, TextField, SelectField, CountryCode, Country} from './../forms'

const validate = values => {
  const required = value => value ? null : 'Required'
  const emailregex = email => (/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(values.email || '')) ? null : 'Invalid email'
  const errors = {}
  errors.name = required(values.name)
  errors.phone = required(values.phone)
  errors.email = emailregex(values.email || '')
  if (!values.email) {
    errors.email = 'Required'
  } else if (emailregex(values.email)) {
    errors.email = 'Invalid Email'
  }
  errors.address = required(values.address)
  errors.company = required(values.company)
  errors.city = required(values.city)
  errors.state = required(values.state)
  errors.zip = required(values.zip)
  errors.country = required(values.country)
  errors.country_code = required(values.country_code)
  if (values.phone) {
    errors.phone = (values.phone).length === 10 ? null : 'Invalid Mobile Number'
  }
  return errors
}

const SignUpUserForm = reduxForm({
  form: 'signup user form',
  fields: ['name', 'phone', 'country_code', 'country', 'email', 'address', 'company', 'city', 'state', 'zip', 'job_title'],
  validate
})(React.createClass({
  render () {
    const {
      fields: {phone, name, email, country_code, country, address, company, city, state, zip, job_title},
      handleSubmit,
      submitting,
      onClosed,
      error
    } = this.props

    return (
        <form className={`ui form ${submitting ? 'loading' : ''}`} onSubmit={handleSubmit}>
          <div className="ui top attached message">
            <h2>Sign Up Form:</h2>
          </div>
          <div className="ui middle attached segment">
            <div className="two fields">
              <div className="field">
                <label>Name</label>
                <input type="text" placeholder="Name" {...name}/>
                {name.touched && name.error && <div className="ui pointing red basic label">{name.error}</div>}
              </div>
              <div className={` ${email.value ? 'disabled' : ''} field`}>
                <label>Email</label>
                <input type="text" autoComplete="off" placeholder="Email" {...email}/>
                {email.touched && email.error && <div className="ui pointing red basic label">{email.error}</div>}
              </div>
            </div>
            <div className="two fields">
              <div className="field">
                <label>Mobile Number</label>
                <div className="two fields">
                  <CountryCode {...country_code}/>
                  <PhoneFieldWithoutCountryCode {...phone}/>
                </div>
              </div>
              <div className="field">
                <label>Company</label>
                <input type="text" placeholder="Company" {...company}/>
                {company.touched && company.error && <div className="ui pointing red basic label">{company.error}</div>}
              </div>
            </div>
            <div className="two fields">
              <div className="field">
                <label>Country</label>
                  <Country {...country}/>
                  {country.touched && country.error && <div className="ui pointing red basic label">{country.error}</div>}
              </div>
              <div className="field">
                <label>State</label>
                <input type="text" placeholder="State" {...state}/>
                {state.touched && state.error && <div className="ui pointing red basic label">{state.error}</div>}
              </div>
              <div className="field">
                <label>City</label>
                <input type="text" placeholder="City" {...city}/>
                {city.touched && city.error && <div className="ui pointing red basic label">{city.error}</div>}
              </div>
            </div>
            <div className="two fields">
              <div className="field">
                <label>Address</label>
                <input type="text" placeholder="Address" {...address}/>
                {address.touched && address.error && <div className="ui pointing red basic label">{address.error}</div>}
              </div>
              <div className="field">
                <label>Zip</label>
                <input type="text" placeholder="Zip" {...zip}/>
                {zip.touched && zip.error && <div className="ui pointing red basic label">{zip.error}</div>}
              </div>
            </div>
            <div className="one field">
              <label>Job Title</label>
              <input type="text" placeholder="Job Title" {...job_title}/>
            </div>
            <div className="ui error message">
              <div className="header">Error !</div>
              <p>{error}</p>
            </div>
          </div>
          <div className="ui bottom attached segment">
            <button className="ui basic button " onClick={onClosed} type="button">Cancel</button>
            <button className="ui primary right floated button" type="submit">Submit</button>
          </div>
        </form>
    )
  }
}))

export default SignUpUserForm
