/* globals $ */
import React, {PropTypes} from 'react'

// Need to replace hardcoded DOM id with a ref
export default React.createClass({
  propTypes: {
    percent: PropTypes.number.isRequired
  },
  render () {
    return (
      <div className="ui tiny teal progress" id="internal_sensor_progress">
        <div className="bar">
        </div>
      </div>
    )
  },
  componentDidMount () {
    this.updateProgress(this.props.percent)
  },
  componentWillReceiveProps (newProps) {
    if (this.props.percent !== newProps.percent) {
      this.updateProgress(newProps.percent)
    }
  },
  updateProgress (percent) {
    $('#internal_sensor_progress').progress({
      percent: percent
    })
  }
})
