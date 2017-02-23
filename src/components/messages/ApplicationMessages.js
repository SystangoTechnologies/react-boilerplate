import React from 'react'
import {Modal} from '../modals'
import MessageBlock from './MessageBlock'

const WatchVideoMessageBlock = ({ onPlay }) => {
  return (
    <MessageBlock type="icon info">
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <div className="header">
            Introduction Video
          </div>
          <p>
            Welcome Demo User! Please click to watch videos.
          </p>
        </div>
        <div>
          <a onClick={onPlay}>
            <i className="huge video play icon" style={{marginRight: '-11px'}}/>
          </a>
        </div>
      </div>
    </MessageBlock>
  )
}

// https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php
const styles = {
  videoWrapper: {
    position: 'relative',
    paddingBottom: '56.25%', /* 16:9 */
    paddingTop: '25px',
    height: '0px'
  },
  iframe: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%'
  }
}

const YoutubeVideo = ({ src }) => (
  <div style={styles.videoWrapper}>
    <iframe style={styles.iframe} src={src} frameBorder="0" allowFullScreen></iframe>
  </div>
)

export default React.createClass({
  getInitialState () {
    return { showModal: false }
  },

  closeModal () {
    this.setState({ showModal: false })
  },

  showModal () {
    this.setState({ showModal: true })
  },

  handlePlay () {
    this.showModal()
  },
  render () {
    return (
      <div>
        <WatchVideoMessageBlock onPlay={this.handlePlay}/>
        {
          this.state.showModal &&
          <Modal onClosed={this.closeModal}>
            <YoutubeVideo src="https://www.youtube.com"/>
          </Modal>
        }
      </div>
    )
  }
})
