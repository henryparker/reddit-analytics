import './firebase/firebase';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { store } from './index';
import AppRouter from './routers/AppRouter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="display-1"> This is a reddit analysis app</h1>
          <br />
          <Provider store={store}>
            <AppRouter />
          </Provider>
        </header>
      </div>
    );
  }
}

export default App;
