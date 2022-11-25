import { useRef, useState } from 'react';
import bomb from './assets/bomb.png';

export default function Bomb(props) {
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState('01:00:00');
  const [init, setInit] = useState('');

  const [passwd, setPasswd] = useState({
    number1: 1,
    number2: 2,
    number3: 3,
    number4: 4,
  });

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    if (total === 0) return props.changeScreen('fail');
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };

  const iniciar = () => {
    setInit('none');
    if (!Ref.current) {
      setTimer('01:00:00');
      clearTimer(getDeadTime());
    }
  };

  const onChange = (e) => {
    const value = e.target.value > 9 ? 9 : e.target.value;
    setPasswd({
      [e.target.name]: value,
    });
  };

  const checkPasswd = () => {
    const concat = '' + passwd.number1 + passwd.number2 + passwd.number3 + passwd.number4;
    console.log(concat, process.env.REACT_APP_PASSWD);
    if (concat === process.env.REACT_APP_PASSWD) {
      clearInterval(Ref.current);
      props.changeScreen('success');
      return console.log('CERTO');
    }
    return console.log('ERRADO');
  };

  return (
    <div
      className="main"
      style={{
        display: props.display || 'grid',
        gridTemplateRows: '300px 30%',
        gridTemplateColumns: '100%',
        justifyContent: 'center',
        backgroundImage: `url(${bomb})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '980px',
        backgroundPositionX: '55%',
      }}
    >
      <div
        className="bomb"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          className="timer"
          style={{
            color: 'red',
            backgroundColor: 'black',
            fontSize: 80,
            textAlign: 'center',
            borderRadius: '10px',
            margin: '-50px 0 0 31%',
          }}
        >
          <span className="minutes">{timer}</span>
        </p>
        <div>
          <button onClick={iniciar} style={{ display: init }} className="iniciar">
            INICIAR
          </button>
        </div>
      </div>
      <div className="passwd" style={{ display: !init ? 'none' : '' }}>
        <input
          type="number"
          name="number1"
          max={9}
          min={0}
          placeholder="1"
          onChange={onChange}
          value={passwd.number1}
        />
        <input
          type="number"
          name="number2"
          max={9}
          min={0}
          placeholder="2"
          onChange={onChange}
          value={passwd.number2}
        />
        <input
          type="number"
          name="number3"
          max={9}
          min={0}
          placeholder="3"
          onChange={onChange}
          value={passwd.number3}
        />
        <input
          type="number"
          name="number4"
          max={9}
          min={0}
          placeholder="4"
          onChange={onChange}
          value={passwd.number4}
        />
        <button onClick={checkPasswd} className="btn-check">
          Check
        </button>
      </div>
    </div>
  );
}
