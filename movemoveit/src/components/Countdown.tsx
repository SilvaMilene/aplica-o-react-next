import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60); /*math.floor arreponda o número*/
  const seconds = time % 60; /* resto que não coube na divisão*/

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); /*quando tiver apenas um nº essa linha add um 0 na frente por isso usa o padStart
  split serve para "repartir" os numeros 15 = '1' '5' */
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
    
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1) 
      }, 1000)
    } else if (isActive && time === 0) {
        setHasFinished(true);
        setIsActive(false);
    }
  }, [isActive, time]) //quando o time muda ele roda tbm e assim tem um "ciclo"

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button 
          disabled
          className={styles.countdownButton}
        >

          Ciclo encerrado
        </button>
        ) : ( 
          <>
            { isActive ? (
              <button 
                type="button" 
                className={`${styles.countdownButton} ${styles.countdownButtonActive} `} 
                onClick={resetCountdown}
              >
                Abandonar ciclo
              </button>
            ) : ( 
              
              <button 
                type="button" 
                className={styles.countdownButton} 
                onClick={startCountdown}
              >

                Iniciar um ciclo
              </button>
            )}
          </>
      )}
    </div>
  );
}