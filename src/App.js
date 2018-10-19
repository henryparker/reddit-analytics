import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './App.css';

import SearchDashboard from './components/SearchDashboard';
import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import {r} from './reddit-auth/reddit-auth';
import Sentiment from 'sentiment';
const sentiment = new Sentiment();

const store = configureStore();
const print = ()=>{
  console.log("%c Rendered with 👉 👉👇", "background: purple; color: #FFF");
  const state = store.getState();
  console.log(state);
  console.log(sentiment.analyze("I love cat"));
}
const state = store.getState();
  console.log(state);

store.subscribe(print);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p> this is a reddit analysis app</p>
          <Provider store={store}>
            <AppRouter/>
          </Provider>
        </header>
      </div>
    );
  }
}


export default App;
