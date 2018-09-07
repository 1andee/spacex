import React, { Component } from 'react';
import Header from './Header';
import Search from './Search';
import Results from './Results';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {}
  }

  updateLaunchList = (json) => {
    this.setState({
      launchList: json
    })
  };

  render() {
    return (
      <div className="App">
        <Header/>
        <Search refreshMatchingRecords={this.updateLaunchList} />
        <Results searchResults={this.state.launchList} />
      </div>
    );
  };
}

export default App;
