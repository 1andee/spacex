import React, { Component } from 'react';
import './App.css';

class App extends Component {

  fetchApiData = () => {
    fetch('https://api.spacexdata.com/v2/launches?nationality=Canada', {
      method: 'get'
    })
    .then(response => response.json())
    .then((json) => {
      console.log(json);
    })
    .catch(error => console.error('Error:', error));
  }

  componentDidMount() {
    this.fetchApiData();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Space-X Demo App</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
