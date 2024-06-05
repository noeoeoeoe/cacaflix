import logo from './logo.svg';
import './Home.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> CACAFLIX </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to caca.
        </p>
        <a
          className="App-link"
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
