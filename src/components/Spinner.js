import React from 'react'
import styles from './Spinner.css'

const spinners = {
  rotatingPlane: (
    <div className={styles.rotatingPlane}></div>
  ),
  wave: (
    <div className={styles.wave}>
      <div className={styles.waveRect1}></div>
      <div className={styles.waveRect2}></div>
      <div className={styles.waveRect3}></div>
      <div className={styles.waveRect4}></div>
      <div className={styles.waveRect5}></div>
    </div>
  )
}

export default ({effect}) => {
  return spinners[effect]
}
