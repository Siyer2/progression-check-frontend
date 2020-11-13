import React from 'react';

import './bootstrap.min.css';
import './App.css';

import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Home />
      <footer style={{textAlign: 'right'}}>
        <p>By <a href="https://github.com/Siyer2">Syam</a>&nbsp;&nbsp;</p>
      </footer>
    </div>
  );
}

export default App;
