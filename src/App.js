import { useState } from 'react';
import './App.css';

import Banner from './banner';
import Bomb from './bomb';

function App() {
  const [screen, setScreen] = useState('bomb');

  return (
    <div className="App">
      <Banner />
      <Bomb display={screen === 'bomb' ? '' : 'none'} changeScreen={setScreen}/>
      <div
        className="success"
        style={{
          display: screen === 'success' ? 'flex' : 'none',
          justifyContent: 'center',
          height: '450px',
        }}
      >
        <img alt="sucesso" src={require('./assets/dicaprioSucess.gif')} />
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
