import {firebase,authState} from './firebase/firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import {history} from './routers/AppRouter';
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import {startSetSavedChart} from './actions/search';
import {login,logout} from './actions/auth';
import axios from 'axios';
window.axios = axios;

// require('dotenv').config();
export const store = configureStore();
const print = ()=>{
  console.log("%c Rendered with 👉 👉👇", "background: purple; color: #FFF");
  const state = store.getState();
  console.log(state);
}
store.subscribe(print);


// ReactDOM.render(<h1 className="display-1">Loading...</h1>, document.getElementById('root'));
ReactDOM.render(<App/>, document.getElementById('root'));

// store.dispatch(startSetSavedChart()).then(()=>{
//     ReactDOM.render(<App />, document.getElementById('root'));
// })

// let hasRendered = false;
// const renderApp = () => {
//   if (!hasRendered) {
//     ReactDOM.render(<App />, document.getElementById('root'));
//     hasRendered = true;
//   }
// };
// renderApp();
// console.log("hi");

// authState.then((res)=>{
//   console.log(res);
//   if(res.data._id){
    
//     store.dispatch(login(res.data._id));
//     renderApp();
//   }else{
//     renderApp();
//     store.dispatch(logout());
//     history.push('/');
//   }
// });

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     store.dispatch(login(user.uid));
//     store.dispatch(startSetSavedChart()).then(()=>{
//       renderApp();
//       // if(history.location.pathname === '/'){
//       //   history.push('/dashboard');
//       // }
//     })
//   } else {
//     renderApp();
//     store.dispatch(logout());
//     history.push('/');
//   }
// });

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
