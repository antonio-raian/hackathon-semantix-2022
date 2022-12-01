import { useEffect, useRef, useState } from 'react';
import bomb from './assets/bomb.png';
import api from './utils/api';

export default function Bomb(props) {
  const Ref = useRef(null);

  // The state for our timer
  const [hour, setHour] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);

  const [passwd, setPasswd] = useState({
    number1: 1,
    number2: 2,
    number3: 3,
    number4: 4,
  });

  useEffect(() => {
    const x = async () => {
      await api
        .get('/timer')
        .then((res) => {
          console.log('Resposta', { res });
          const { hour, minNum, segNum, active, winner } = res.data;
          if (winner) {
            props.changeScreen('success');
            props.setWinner(winner.name);
          }
          setHour(addZero(hour));
          setMinutes(addZero(minNum));
          setSeconds(addZero(segNum));
          setActive(active);
          active && iniciar();
        })
        .catch((e) => {
          console.log(e);
        });
    };
    x();
  }, []);

  const segundos = () => {
    let sec = seconds - 1;
    if (sec < 0) {
      sec = 59;
      setSeconds(sec);
      return minutos();
    }
    if (sec < 10) {
      return setSeconds('0' + sec);
    }
    setSeconds(sec);
  };

  const minutos = () => {
    let minNum = minutes - 1;
    if (minNum < 0) {
      minNum = 59;
      setMinutes(minNum);
      return horas();
    }
    if (minNum < 10) {
      return setMinutes('0' + minNum);
    }
    setMinutes(minNum);
  };

  const horas = () => {
    let hr = hour - 1;
    if (hr < 0) {
      clearInterval(Ref.current);
      props.changeScreen('fail');
    }
    if (hr < 10) {
      return setHour('0' + hr);
    }
    setHour(hr);
  };

  useEffect(() => {
    iniciar();
  });

  const iniciar = () => {
    if (active) {
      clearInterval(Ref.current);
      Ref.current = setInterval(() => {
        segundos();
      }, 1000);
    }
  };

  const onChange = (e) => {
    const value = e.target.value > 9 ? 9 : e.target.value;
    setPasswd({ ...passwd, [e.target.name]: value });
  };

  const checkPasswd = async () => {
    const id = prompt('Identifique-se:');
    const concat = '' + passwd.number1 + passwd.number2 + passwd.number3 + passwd.number4;
    return await api.post('/passwd', { id, passwd: concat }).then((res) => {
      console.log(res.data);
      const { success, user, msg } = res.data;
      if (success) {
        clearInterval(Ref.current);
        props.changeScreen('success');
        props.setWinner(user.name);
        return console.log('CERTO');
      }
      alert(msg);
      return console.log('ERRADO');
    });
  };

  const addZero = (num) => {
    return num > 9 ? num : '0' + num;
  };

  return (
    <div
      className="main"
      style={{
        display: props.display || 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundImage: `url(${bomb})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: '980px',
        // backgroundPositionX: '55%',
      }}
    >
      <div
        className="bomb"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', 
        }}
      >
        <img src={bomb} alt="bomb" width={950}/>
        <p
          className="timer"
          style={{
            color: 'red',
            backgroundColor: 'black',
            fontSize: 112,
            textAlign: 'center',
            borderRadius: '10px',
            marginTop: '5%',
            marginLeft: '-11%',
            position: 'absolute'
          }}
        >
          <span className="minutes">{hour + ':' + minutes + ':' + seconds}</span>
        </p>
      </div>
      <div className="passwd">
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
