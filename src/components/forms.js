/* globals $ */
import React, {PropTypes} from 'react'
import {Modal} from './modals'
import {propTypes} from 'redux-form'
import classNames from 'classnames'
import uniqueId from 'lodash/uniqueId'
import InputElement from 'react-input-mask'
import countryList from './countryList'

export const ModalForm = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onAction: PropTypes.func.isRequired,
    actionLabel: PropTypes.string
  },
  getInitialState () {
    return {
      deleteActionProcessing: false
    }
  },
  handleOk () {
    this.props.onAction()
      // .then(() => this.setState({processing: false}), () => this.setState({processing: false}))
  },
  handleDelete () {
    this.setState({deleteActionProcessing: true})
    this.props.deleteAction()
  },
  render () {
    const actionLabel = this.props.actionLabel || 'Ok'
    return (
      <Modal onClosed={this.props.onCancel} size="small">
        <i className="close icon" onClick={this.props.onCancel}/>
        <div className="header">
          {this.props.title}
        </div>
        <div className="content">
          {this.props.children}
        </div>
        <div className="actions">
          {this.props.deleteAction && <a className={classNames('ui basic left floated', this.state.deleteActionProcessing && 'loading', 'button')} onClick={this.handleDelete}>Delete</a>}
          <a className="ui basic button" onClick={this.props.onCancel}>Cancel</a>
          <a className={classNames('ui primary', this.props.isSaving && 'loading', 'button')} onClick={this.handleOk}>{actionLabel}</a>
        </div>
      </Modal>
    )
  }
})

export const Form = ({error, children}) => {
  const errorClass = error ? 'error' : ''
  return (
    <form className={`ui form ${errorClass}`}>
      {children}
    </form>
  )
}

export const FormHeader = ({title, error}) => {
  const errorClass = error ? 'error' : ''
  return (
    <div className={`ui top attached ${errorClass} message`}>
      <div className="header">{title}</div>
      {error && <p>{error}</p> }
    </div>
  )
}

export const FormBody = ({children}) => {
  return (
    <div className="ui attached fluid segment">
      {children}
    </div>
  )
}

export const FormActions = ({children}) => {
  return (
    <div className="ui bottom attached segment">
      {children}
    </div>
  )
}

const StandardFormActions = (props) => {
  const disableWhen = props.disableWhen || ((p) => p.pristine || p.invalid)
  const disabled = disableWhen(props) ? 'disabled' : ''
  const loading = props.submitting ? 'loading' : ''
  const resetClass = props.submitting ? 'disabled' : ''
  return (
    <FormActions>
      <div className={`ui blue submit ${loading} ${disabled} button`} onClick={props.handleSubmit}>{props.submitButton || 'Save Changes'}</div>
      {props.resetButton && <div className={`ui ${resetClass} button`} onClick={props.resetForm}>{props.resetButton}</div>}
    </FormActions>
  )
}

export const StandardForm = React.createClass({
  propTypes: {
    ...propTypes,
    title: PropTypes.string,
    resetButton: PropTypes.string,
    submitButton: PropTypes.string,
    actions: PropTypes.object,
    disableWhen: PropTypes.func
  },
  render () {
    return (
      <Form {...this.props}>
        <FormHeader {...this.props}/>
        <FormBody {...this.props}/>
        <StandardFormActions {...this.props}/>
      </Form>
    )
  }
})

// Does not require SemanticUI javascript.
// Note: input and label must have the same parent and label follow the input, otherwise semantic styles do not apply.
export const CheckboxField = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool
  },
  componentDidMount () {
    this._uniqueId = uniqueId('checkbox-')
  },
  render: function () {
    const {label, name, checked, disabled, type, onChange} = this.props
    return (
      <div className={classNames(disabled && 'disabled', 'field')}>
        <div className={`ui ${type} checkbox`}>
          <input
            id={this._uniqueId}
            ref="input"
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor={this._uniqueId}>{label}</label>
        </div>
      </div>
    )
  }
})

export const CustomToggleCheckboxField = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.any,
    name: PropTypes.string,
    values: PropTypes.object.isRequired
  },
  componentDidMount () {
    this._uniqueId = uniqueId('checkbox-')
  },
  render () {
    const {values, checked, touched, error, name, label} = this.props
    return (
      <div className="grouped fields">
        {touched && error && <div className="ui left pointing red basic label">
          {error}
        </div>

      }
        {Object.keys(values).map((key, index) => (
          <div key={key} className="field">
            <div className="ui toggle checkbox">
              <input
                checked={checked}
                ref="input"
                id={`${name}-${this._uniqueId}-${index}`} type="checkbox" name={name}
                onChange = {(!this.props.checked && !this.props.value) ? this.props.onChange.bind(this, values[key]) : this.props.onChange }
              />
            <label>{label}</label>
            </div>
          </div>
        ))}
      </div>
    )
  }
})

export const RadioField = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.any,
    name: PropTypes.string,
    values: PropTypes.object.isRequired
  },
  componentDidMount () {
    this._uniqueId = uniqueId('radio-group-')
  },
  render () {
    const {values, value, touched, error, name, label} = this.props
    return (
      <div className="grouped fields">
        <label>{label}</label>
        {touched && error && <div className="ui left pointing red basic label">
          {error}
        </div>
      }
        {Object.keys(values).map((key, index) => (
          <div key={key} className="field">
            <div className="ui radio checkbox">
              <input
                id={`${name}-${this._uniqueId}-${index}`} type="radio" name={name} checked={value === values[key]}
                onChange={this.props.onChange.bind(this, values[key])}
              />
              <label htmlFor={`${name}-${this._uniqueId}-${index}`}>{key}</label>
            </div>
          </div>
        ))}
      </div>
    )
  }
})

export const RadioFieldWithDisabledCheckbox = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.any,
    name: PropTypes.string,
    values: PropTypes.array.isRequired
  },
  componentDidMount () {
    this._uniqueId = uniqueId('radio-group-')
  },
  render () {
    const {values, value, touched, error, name, label} = this.props

    return (
      <div className="grouped fields">
        <label>{label}</label>
        {touched && error && <div className="ui left pointing red basic label">
          {error}
        </div>
      }
        {values.map((data, index) => (
          <div key={data.value} className="field">
            <div className={`ui radio ${data.disabled ? 'disabled' : ''} checkbox`}>
              <input
                id={`${name}-${this._uniqueId}-${index}`} disabled={data.disabled ? 'disabled' : ''} type="radio" name={name} checked={value === data.value}
                onChange={this.props.onChange.bind(this, data.value)}
              />
              <label htmlFor={`${name}-${this._uniqueId}-${index}`}>{data.label}</label>
            </div>
          </div>
        ))}
      </div>
    )
  }
})

export const TextField = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool
  },
  componentDidMount () {
    this._uniqueId = uniqueId(`${this.props.name}-text-field-`)
  },
  render () {
    const {label, touched, valid, error, ...otherProps} = this.props
    const errorClass = touched && !valid ? 'error' : ''
    const type = this.props.type || 'text'
    return (
      <div className={`${this.props.disabled ? 'disabled' : ''} field ${errorClass}`}>
        <label htmlFor={this._uniqueId}>{this.props.label}</label>
        <input id={this._uniqueId} type={type} {...otherProps}/>
        {error && <div className="ui pointing red basic label">
          {error}
        </div>
        }
      </div>
    )
  }
})

export const EmailField = (props) => (
  <TextField {...props} type="email"/>
)

export const PhoneField = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string.isRequired
  },
  componentDidMount () {
    this._uniqueId = uniqueId(`${this.props.name}-phone-field-`)
  },
  render () {
    const {label, touched, valid, error, ...otherProps} = this.props
    const errorClass = touched && !valid ? 'error' : ''
    return (
      <div className={`field ${errorClass}`}>
        <label htmlFor={this._uniqueId}>{this.props.label}</label>
        <div className="ui input">
          <InputElement id={this._uniqueId} mask="+1-999-999-9999" {...otherProps}/>
        </div>
        {error && <div className="ui pointing red basic label">
          {error}
        </div>
        }
      </div>
    )
  }
})

export const SelectField = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    prompt: PropTypes.string,
    labelStyle: PropTypes.object,
    inline: PropTypes.bool,
    search: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    infoHoverContent: PropTypes.string
  },
  componentDidMount () {
    this._uniqueId = uniqueId(`${this.props.name}-text-field-`)
    this._dropdown = $(this._element).dropdown({
      onChange: this.props.onChange
    })
  },
  componentWillReceiveProps (newProps) {
    if (this.props.value !== newProps.value) {
      this._dropdown.dropdown('set selected', newProps.value)
    }
  },
  render () {
    const {label, type, infoHoverContent, ...otherProps} = this.props
    return (
      <div className={`${this.props.inline ? 'inline' : ''} ${this.props.disabled ? 'disabled' : ''} field`}>
        <label htmlFor={this._uniqueId} style={this.props.labelStyle}>{this.props.label}</label>
        {infoHoverContent && <i className="large help circle icon" style={{'marginRight': '1rem'}} data-content={infoHoverContent} ref={el => $(el).popup({hoverable: true})}></i>}
        <div className={`ui ${type || 'selection'} dropdown`} ref={el => (this._element = el)}>
          <input type="hidden" id={this._uniqueId} {...otherProps}/>
          <div className="default text">{this.props.prompt ? this.props.prompt : 'Select'}</div>
          <i className="dropdown icon"/>
          <div className="menu">
            { this.props.options.map(option => (
              <div className="item" key={option[0]} data-value={option[0]} data-text={option[1]}>
                {option[1]}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
})

import states from 'ustates'
const statesOptions = states.index.map(state => [state.code, state.name])

export const UsStatesSelectField = (props) => (
  <SelectField {...props} options={statesOptions} prompt="State" search={true}/>
)

export const FieldsPanel = (props) => (
  <div className={'ui segment'}>
    <div className={`ui ${props.disabled ? 'active' : ''} inverted dimmer`}>
    </div>
    {props.children}
  </div>
)

export const Country = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string.isRequired
  },
  componentDidMount () {
    this._uniqueId = uniqueId(`${this.props.name}-phone-field-`)
    this._dropdown = $(this._element).dropdown({
      onChange: this.props.onChange
    })
    this.setDefault(this.props.value)
  },
  componentWillReceiveProps (newProps) {
    if (this.props.value !== newProps.value) {
      this.setDefault(newProps.value)
    }
  },
  setDefault (value) {
    this._dropdown.dropdown('set selected', value)
  },
  render () {
    const {touched, valid} = this.props
    const errorClass = touched && !valid ? 'error' : ''
    const options = countryList
    return (
      <div className={`field ${errorClass}`}>
        <div className="ui fluid search selection dropdown" ref={el => (this._element = el)}>
          <input type="hidden" id={this._uniqueId}/>
          <i className="dropdown icon"/>
          <div className="default text">{this.props.prompt ? this.props.prompt : 'Select'}</div>
          <div className="menu">
            {options.map(option => (
              <div className="item" key={option[0]} data-value={option[1]}><i className={`${option[1]} flag`}></i>{option[0]}</div>))}
          </div>
        </div>
      </div>
    )
  }
})

export const CountryCode = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string.isRequired
  },
  componentDidMount () {
    this._uniqueId = uniqueId(`${this.props.name}-phone-field-`)
    this._dropdown = $(this._element).dropdown({
      onChange: this.props.onChange
    })
    this.setDefault(this.props.value)
  },
  componentWillReceiveProps (newProps) {
    if (this.props.value !== newProps.value) {
      this.setDefault(newProps.value)
    }
  },
  setDefault (value) {
    this._dropdown.dropdown('set selected', value)
  },
  render () {
    const {touched, valid} = this.props
    const errorClass = touched && !valid ? 'error' : ''
    const options = countryList
    return (
      <div className={`field ${errorClass}`}>
        <div className="ui fluid search selection dropdown" ref={el => (this._element = el)}>
          <input type="hidden" id={this._uniqueId}/>
          <i className="dropdown icon"/>
          <div className="default text">{this.props.prompt ? this.props.prompt : 'Select'}</div>
          <div className="menu">
            {options.map(option => (
              <div className="item" key={option[0]} data-value={option[2]}><i className={`${option[1]} flag`}></i>{option[0]}</div>))}
          </div>
        </div>
      </div>
    )
  }
})

export const PhoneFieldWithoutCountryCode = React.createClass({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string.isRequired
  },
  componentDidMount () {
    this._uniqueId = uniqueId(`${this.props.name}-phone-field-`)
  },
  valueChanged (phoneNumberValue) {
    const phoneNumber = phoneNumberValue.target.value.replace(/[_-]/gi, '')
    this.props.onChange(phoneNumber)
  },
  render () {
    const {touched, valid, error, ...otherProps} = this.props
    const errorClass = touched && !valid ? 'error' : ''
    return (
      <div className={`field ${errorClass}`}>
        <div className="ui input">
          <InputElement id={this._uniqueId} mask="999-999-9999" value={otherProps.value} onChange={this.valueChanged}/>
        </div>
        {error && touched && <div className="ui pointing red basic label">
          {error}
        </div>
        }
      </div>
    )
  }
})
