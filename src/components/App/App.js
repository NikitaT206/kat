import styles from './App.module.css';
import { useEffect, useMemo, useState } from 'react';
import { ArrayOfSymbols } from '../ArrayOfSymbols/ArrayOfSymbols';

function App() {

  const [width, setWidth] = useState(window.innerWidth)
  const [isPanelHidden, setIsPanelHidden] = useState(true)
  const [currentColor, setCurrentColor] = useState(localStorage.getItem('color') || 'green')
  const [settings, setSettings] = useState(false)

  const buttonClassName = useMemo(() => {
    if (currentColor === 'red') return styles.buttonRed
    if (currentColor === 'blue') return styles.buttonBlue
    if (currentColor === 'green') return styles.buttonGreen
  }, [currentColor])

  const array = useMemo(() => {
    if (width <= 500) {
      return [...new Array(Math.floor(width / 35))]
    }
    return [...new Array(Math.floor(width / 50))]
  } , [width])

  useEffect(() => {
    if (!localStorage.getItem('color')) {
      setTimeout(() => {
        setIsPanelHidden(false)
        setTimeout(() => {
          setIsPanelHidden(true)
        }, 3000)
      }, 5000)
    }
  }, [])

  function changeColor(color) {
    if (color === currentColor) return
    setCurrentColor(color)
    localStorage.setItem('color', color)
    setIsPanelHidden(true)
    setTimeout(() => {
      setSettings(false)
    }, 500)
  }

  function showSettings() {
    setSettings(true)
  }

  function setPanelHidden() {
    setIsPanelHidden(!isPanelHidden)
    setTimeout(() => {
      setSettings(false)
    }, 500)
  }

  function setPanelHiddenOnMouseOut() {
    setIsPanelHidden(true)
    setTimeout(() => {
      setSettings(false)
    }, 500)
  }
 
  return (
    <div className={styles.app} onClick={setPanelHidden}>
      {array.map((item, index) => {
        return <ArrayOfSymbols key={index} color={currentColor}/>
      })}
      <div onClick={(event) => event.stopPropagation()} className={isPanelHidden ? styles.panelHidden : styles.panel}>
        {! settings && <button className={buttonClassName} onClick={showSettings}>Change color</button>}
        {settings && (
          <div className={styles.buttonsContainer}>
            <button className={styles.buttonRed} onClick={() => changeColor('red')}>Red</button>
            <button className={styles.buttonBlue} onClick={() => changeColor('blue')}>Blue</button>
            <button className={styles.buttonGreen} onClick={() => changeColor('green')}>Green</button>
          </div>
        ) }
      </div>
    </div>
  );
}

export default App;
