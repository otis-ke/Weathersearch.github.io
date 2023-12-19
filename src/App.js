import './index.css'
import React from 'react';
import './App.css';
import WeatherApp from './components/WeatherApp/WeatherApp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NOTIS WEATHER</h1>
      </header>

      <main>
        <WeatherApp />
      </main>

      <footer>
        <p>&copy; 2023 Notis Weather. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
