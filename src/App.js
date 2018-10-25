import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './App.css';
import {DateTime,Interval} from 'luxon';
import moment from 'moment';
import SearchDashboard from './components/SearchDashboard';
import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import {r} from './reddit-auth/reddit-auth';
import Sentiment from 'sentiment';
const sentiment = new Sentiment();
const now = DateTime.local();
const later = DateTime.local(2018, 10, 26);
let i = Interval.fromDateTimes(now, later);
console.log("now",now);
console.log("later",later);
console.log(i.length('days',true));
var a = moment();
console.log("a",a.format("MM:DD:YY:HH"));
var b = a.clone();
b = b.add(1,'seconds');
console.log("b",b.format("MM:DD:YY:HH"));
var c = b.diff(a,'seconds');
console.log("c",c);
// r.search({
//   query: "cat"
// }).then(myListing => {
//   console.log(myListing);
//   myListing.fetchMore({amount: 25}).then(extendedListing => {
//     console.log(extendedListing);
//   })
// });

const store = configureStore();
const print = ()=>{
  console.log("%c Rendered with 👉 👉👇", "background: purple; color: #FFF");
  const state = store.getState();
  console.log(state);
}


store.subscribe(print);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="display-1"> This is a reddit analysis app</h1>
          <br/>
          <Provider store={store}>
            <AppRouter/>
          </Provider>
        </header>
      </div>
    );
  }
}


export default App;
