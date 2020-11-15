import React from 'react';

import './bootstrap.min.css';
import './App.css';

import NavBar from './components/NavBar'; 
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Main />
      <footer style={{textAlign: 'right'}}>
        <p>By <a href="https://github.com/Siyer2">Syam</a>&nbsp;&nbsp;</p>
      </footer>
    </div>
  );
}

export default App;
