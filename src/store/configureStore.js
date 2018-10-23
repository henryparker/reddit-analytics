import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import typingReducer from '../reducers/typing';
import searchReducer from '../reducers/search';
import analyticsReducer from '../reducers/analytics';
import combineSentimentsReducer from '../reducers/combineSentiments';
import favoriteChartReducer from '../reducers/favoriteChart';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      input: typingReducer,
      searchResult: searchReducer,
      sentiment: analyticsReducer,
      combineSentiments: combineSentimentsReducer,
      favoriteChartData: favoriteChartReducer
      
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};