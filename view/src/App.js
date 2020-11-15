import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function getBikeParts(){
  let bikeParts = "";
  axios.get("http://localhost:8080/api/parts/").then((res) => {bikeParts = res.data}).catch((e) => {console.log(e)})
  return bikeParts;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {JSON.stringify(getBikeParts())}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bike Build Tracker
        </a>
      </header>
    </div>
  );
}

export default App;
