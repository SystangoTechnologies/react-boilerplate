/* globals $ */
import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'

export const Modal = React.createClass({
  propTypes: {
    onClosed: PropTypes.func.isRequired,
    size: PropTypes.string
  },
  render () {
    return (
      <div className="modal-container" style={{display: 'inline-block'}}>
        <div className={`ui ${this.props.size || ''} modal`}>
          {this.props.children}
        </div>
      </div>
    )
  },

  componentDidMount: function () {
    this.node = ReactDOM.findDOMNode(this)
    this.renderDialogContent(this.props)
  },

  componentWillReceiveProps: function (newProps) {
    // this.renderDialogContent(newProps)
  },

  renderDialogContent: function (props) {
    this.$modal = $(this.node).find('.ui.modal')
    this.$modal.modal({
      // debug: true,
      detachable: false,
      // closable: false,
      observeChanges: true,
      selector: {
        close: '.modal-close',
        approve: '.actions .modal-positive, .actions .modal-approve, .actions .modal-ok',
        deny: '.actions .modal-negative, .actions .modal-deny, .actions .modal-cancel'
      },
      onShow: () => {
        console.log('onShow')
      },
      onVisible: () => {
        console.log('onVisible')
        // fixes DASH-208 where the first modal opened after page refresh is positioned at the bottom of the screen
        this.$modal.modal('refresh')
      },
      onHide: () => {
        console.log('onHide')
      },
      onHidden: () => {
        console.log('onHidden')
        this._hidden = true
        this.props.onClosed()
      }
    }).modal('show')
  },

  componentWillUnmount: function () {
    if (this._hidden) {
      this.$modal.modal('destroy').remove()
    } else {
      this.$modal.modal('hide').modal('destroy').remove()
    }
  },

  getDefaultProps: function () {
    return {}
  }
})

export const ModalButtonTrigger = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
  },

  getInitialState () {
    return { showModal: false }
  },

  close () {
    this.setState({ showModal: false })
  },

  open () {
    this.setState({ showModal: true })
  },

  render () {
    const {title, ...otherProps} = this.props
    const modal = React.Children.map(this.props.children, child => React.cloneElement(child, { onClosed: this.close }))
    return (
      <span>
        <div {...otherProps} onClick={this.open}>{title}</div>
        { this.state.showModal && modal }
      </span>
    )
  }
})

// Components below are un-used

export const ModalVersion1 = React.createClass({
  componentDidMount () {
    $(this._modal).modal({
      debug: true,
      detachable: false,
      closable: false,
      selector: {
        close: '.modal-close',
        approve: '.actions .modal-positive, .actions .modal-approve, .actions .modal-ok',
        deny: '.actions .modal-negative, .actions .modal-deny, .actions .modal-cancel'
      },
      onHide: () => console.log('Hide'),
      onHidden: () => console.log('Hidden'),
      onApprove: ($element) => {
        console.log('onApprove')
        this.props.onClose()
        return false
      },
      onDeny: ($element) => {
        console.log('onDeny')
        this.props.onClose()
        return false
      }
    })
  },
  componentWillReceiveProps (nextProps) {
    if (!nextProps.open) {
      // need to hide
      $(this._modal).modal('hide')
    } else if (nextProps.open) {
      // need to show
      $(this._modal).modal('show')
    }
  },
  componentWillUnmount () {
    // $(this._modal).modal('hide')
  },
  handleClose (e) {
    this.props.onClose()
  },
  render () {
    return (
      <div className="ui modal" ref={(c) => (this._modal = c)}>
        <i className="close icon" onClick={this.handleClose}/>
        <div className="header">
          Modal Title
        </div>
        <div className="content">
          <p className="" onClick={this.handleClose}>Close me</p>
          {this.props.children}
        </div>
        <div className="actions">
          <a className="ui button" onClick={this.handleClose}>Cancel</a>
          <a className="ui button" onClick={this.handleClose}>OK</a>
        </div>
      </div>
    )
  }
})

export const ModalVersion2 = React.createClass({
  render () {
    return (
      <div className="modal-container"></div>
    )
  },

  componentDidMount: function () {
    this.node = ReactDOM.findDOMNode(this)
    this.renderDialogContent(this.props)
  },

  componentWillReceiveProps: function (newProps) {
    this.renderDialogContent(newProps)
  },

  renderDialogContent: function (props) {
    // props = props || this.props;

    ReactDOM.render((
      <div className="ui modal">
        <i className="close icon" onClick={this.close}/>
        {props.children}
      </div>
    ), this.node)
    this.$modal = $(this.node).find('.ui.modal')

    if (props.open) {
      this.$modal.modal({
        debug: true,
        detachable: false,
        closable: false,
        selector: {
          close: '.modal-close',
          approve: '.actions .modal-positive, .actions .modal-approve, .actions .modal-ok',
          deny: '.actions .modal-negative, .actions .modal-deny, .actions .modal-cancel'
        },
        onHide: () => console.log('Hide'),
        onHidden: () => console.log('Hidden'),
        onApprove: ($element) => {
          console.log('onApprove')
          this.props.onClose()
          return false
        },
        onDeny: ($element) => {
          console.log('onDeny')
          this.props.onClose()
          return false
        }
      }).modal('show')
    } else {
      this.$modal.modal('hide')
    }
  },

  componentWillUnmount: function () {
    this.$modal.modal('hide').modal('destroy').remove()
    ReactDOM.unmountComponentAtNode(this.node)
  },

  getDefaultProps: function () {
    return {
      open: true
    }
  }
})

export const ModalPopUp = React.createClass({
  propTypes: {
    onClosed: PropTypes.func.isRequired,
    onAction: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    actionLabel: PropTypes.string
  },
  render () {
    const actionLabel = this.props.actionLabel || 'Yes'
    return (
        <div className="ui modal second">
          <i className="close icon" onClick={this.props.onClosed}/>
          <div className="header">
            {this.props.title}
          </div>
          <div className="content">
            {this.props.subject}
          </div>
          <div className="actions">
            <a className="ui basic button" onClick={this.props.onClosed}>Cancel</a>
            <a className="ui primary button" onClick={this.props.onAction}>{actionLabel}</a>
          </div>
        </div>
    )
  },
  componentDidMount () {
    $('.ui.modal.second')
      .modal({
        detachable: false,
        closable: false
      })
      .modal('show')
  },
  componentWillUnmount () {
    const isActive = $('.ui.modal.second').modal('is active')
    if (isActive) {
      $('.ui.modal.second').modal('hide')
    }
  }
})
