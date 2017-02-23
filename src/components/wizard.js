import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

const STATE_KEY = 'wizard'
const WIZARD_INIT = '@@wizard/INIT'
const WIZARD_DESTROYED = '@@wizard/DESTROYED'

export const wizardReducer = (state = {}, action = {}) => {
  const withoutProperty = (object, property) => {
    const newObject = { ...object } // need a new object
    delete newObject[property]
    return newObject
  }
  switch (action.type) {
    case WIZARD_INIT:
      return {
        ...state,
        [action.name]: {
          activeStep: action.step,
          returnPath: action.returnPath,
          params: action.params
        }
      }
    case WIZARD_DESTROYED:
      return withoutProperty(state, action.name)
    default:
      return state
  }
}

const createWizardActions = name => ({
  initWizard: ({step, returnPath, params}) => ({ name, type: WIZARD_INIT, step, returnPath, params }),
  destroyed: () => ({ name, type: WIZARD_DESTROYED })
})

export const createWizard = options => WrappedComponent => {
  const wizardKey = options.wizard || 'defaultWizard'
  const actions = createWizardActions(wizardKey)
  const noop = () => ({})
  const { steps = [] } = options

  const findStep = ownProps => {
    const currentStep = ownProps.params.step || options.indexStep || 'start'
    return steps.find(s => s.step === currentStep) || {}
  }

  const createStepState = (state, ownProps) => {
    const step = findStep(ownProps)
    return {
      component: step.component
    }
  }

  const WizardComponent = React.createClass({
    componentDidMount () {
      this.props.dispatch(actions.initWizard({
        step: this.props.params.step,
        params: this.props.params,
        returnPath: (this.props.location.state && this.props.location.state.returnTo) || options.returnPath(this.props.params)
      }))
    },
    componentWillReceiveProps (newProps) {
    },
    componentWillUnmount () {
      this.props.dispatch(actions.destroyed())
    },
    handleCancel () {
      this.props.dispatch(push(this.props.wizard.returnPath))
    },
    handleCompleted () {
      this.props.dispatch(push(this.props.wizard.returnPath))
    },
    handleGotoStep (step, state) {
      this.props.dispatch(push({pathname: options.stepPath(this.props.wizard.params, step), state}))
    },
    render () {
      const StepComponent = this.props.step.component
      const props = {
        ...this.props,
        onCancel: this.handleCancel,
        onCompleted: this.handleCompleted,
        gotoStep: this.handleGotoStep
      }
      return <WrappedComponent {...props}>
        <StepComponent {...props} />
      </WrappedComponent>
    }
  })

  return connect(
    (state, ownProps) => ({
      wizard: state[STATE_KEY][wizardKey],
      step: createStepState(state, ownProps),
      ...(options.props || noop)(state, ownProps)
    }),
    (dispatch, ownProps) => {
      return {
        dispatch,
        ...(options.actions || noop)(dispatch, ownProps)
      }
    }
  )(WizardComponent)
}
