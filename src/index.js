import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import {startSetSavedChart} from './actions/search';
export const store = configureStore();
const print = ()=>{
  console.log("%c Rendered with 👉 👉👇", "background: purple; color: #FFF");
  const state = store.getState();
  console.log(state);
}
store.subscribe(print);


ReactDOM.render(<h1 className="display-1">Loading...</h1>, document.getElementById('root'));

store.dispatch(startSetSavedChart()).then(()=>{
    ReactDOM.render(<App />, document.getElementById('root'));
})
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
