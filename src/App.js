import './App.css';

import Banner from './banner';
import Bomb from './bomb';

function App() {
  return (
    <div className="App">
      <Banner />
      <Bomb />
      <div className="success"></div>
      <div className="fail"></div>

      <script src="scripts/index.js"></script>
    </div>
  );
}

export default App;
