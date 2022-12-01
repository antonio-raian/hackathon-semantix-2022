import { useState } from 'react';
import './App.css';

import Banner from './banner';
import Bomb from './bomb';

function App() {
  const [screen, setScreen] = useState('bomb');
  const [winner, setWinner] = useState('Antonio Mendes');

  return (
    <div className="App">
      <Banner />
      <Bomb
        display={screen === 'bomb' ? '' : 'none'}
        changeScreen={setScreen}
        setWinner={setWinner}
      />
      <div
        className="success"
        style={{
          display: screen === 'success' ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1 style={{ color: 'white' }}>{winner}</h1>
        <img alt="sucesso" src={require('./assets/dicaprioSucess.gif')} width={700} />
      </div>
      <div
        className="fail"
        style={{
          display: screen === 'fail' ? 'flex' : 'none',
          justifyContent: 'center',
          height: '450px',
        }}
      >
        <img alt="sucesso" src={require('./assets/busBoom.gif')} />
      </div>
    </div>
  );
}

export default App;
