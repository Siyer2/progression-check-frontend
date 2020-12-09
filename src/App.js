import React from 'react';

import './bootstrap.min.css';
import './App.css';
import { OverlayTrigger, Button, Popover } from 'react-bootstrap';

import NavBar from './components/NavBar'; 
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Main />
      <footer style={{textAlign: 'left', paddingLeft: '5px'}}>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <Button variant="success">New Features 🎉</Button>
        </OverlayTrigger>
      </footer>
      <footer style={{textAlign: 'right'}}>
        <p>By <a href="https://github.com/Siyer2" target="_blank">Syam</a>&nbsp;&nbsp;</p>
      </footer>
    </div>
  );
}

const newFeatures = [
  "Double Majors", 
  "Delete courses", 
  "Save courses"
]
const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">11th December, 2020</Popover.Title>
    {newFeatures.map((feature, i) => {
      return (
      <Popover.Content key={i+feature}>
        {feature}
     </Popover.Content>)
    })}
  </Popover>
);

export default App;
