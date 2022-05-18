import logo from './images/osmosis.svg';
import './App.css';
import PoolChart from './components/PoolChart/PoolChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='div-logo'>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className='div-pool-select'>
          <select className='pool-select' id="cars">
            <option value="volvo">ATOM/OSMO</option>
            <option value="saab">USDC/OSMO</option>
            <option value="opel">CRO/OSMO</option>
            <option value="audi">DAI/OSMO</option>
          </select>
        </div>
        <PoolChart poolId={1}/>
      </header>
    </div>
  );
}

export default App;
