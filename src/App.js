import logo from './images/osmosis.svg';
import './App.css';
import PoolChart from './components/PoolChart/PoolChart';
import { useState } from 'react';

function App() {
  const [poolId, setPoolId] = useState(1)

  const handlePoolSelection = (e) => {
    setPoolId(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='div-logo'>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className='div-pool-select'>
          <select className='pool-select' id="cars" onChange={handlePoolSelection}>
            <option value={1}>ATOM/OSMO</option>
            <option value={678}>USDC/OSMO</option>
            <option value={15}>CRO/OSMO</option>
            <option value={674}>DAI/OSMO</option>
          </select>
        </div>
        <PoolChart poolId={poolId}/>
      </header>
    </div>
  );
}

export default App;
