import {
  SEARCH_TERM,
  CHANGE_TERM,
  SEARCH_SENTIMENT,
  COMBINE_SENTIMENT,
  ADD_SAVED_CHART,
  REMOVE_SAVED_CHART,
  SET_SAVED_CHART,
  CHANGE_LOADING
} from '../action-types';
import { r } from '../reddit-auth/reddit-auth';
import Sentiment from 'sentiment';
import _ from 'lodash';
import moment from 'moment';
import isEqual from 'react-fast-compare';
import database from '../firebase/firebase';
import axios from 'axios';
const sentiment = new Sentiment();

export const setSavedChart = (data = {}) => ({
  type: SET_SAVED_CHART,
  data
});
// export const startSetSavedChart =()=>{
//     return(dispatch,getState)=>{
//         const uid = getState().auth.uid;
//         return database.ref(`users/${uid}/favoriteChartData`).once('value').then((snapshot)=>{
//             const data = [];
//             snapshot.forEach((childSnapshot)=>{
//                 data.push({
//                     id:childSnapshot.key,
//                     ...childSnapshot.val()
//                 });
//             });
//             dispatch(setSavedChart(data));
//         });
//     };
// };

export const startSetSavedChart = () => {
  return (dispatch, getState) => {
    return axios.get('/savedChart').then(res => {
      let data = [];
      res.data.forEach(child => {
        data.push({
          id: child._id,
          ...child.data
        });
      });
      dispatch(setSavedChart(data));
    });
  };
};

export const addSavedChart = (payload = {}) => ({
  type: ADD_SAVED_CHART,
  payload
  // payload:{
  //     term,
  //     limit,
  //     date: moment().format("YYYY-MM-DD HH:mm"),
  //     // id:uuidv1(),
  //     dataSaved
  // }
});

// export const startAddSavedChart = (term="",limit,dataSaved) =>{
//     return (dispatch,getState)=>{
//         const uid = getState().auth.uid;
//         const state = getState().favoriteChartData;
//         const date = moment().format("YYYY-MM-DD HH:mm");
//         const payload ={term,limit,dataSaved,date};
//         if(state.length === 0){
//             return database.ref(`users/${uid}/favoriteChartData`).push(payload).then((ref)=>{
//                 dispatch(addSavedChart({
//                   id : ref.key,
//                   ...payload
//                 }))

//             })
//         }else if(state.some((val)=>{return isEqual(val.dataSaved,payload.dataSaved)}) ||
//         state.some((val)=>{ return val.term === payload.term &&
//             val.limit === payload.limit &&
//             moment().diff(moment(val.date,"YYYY-MM-DD HH:mm"),'hours') < 24})){

//         }else{
//             return database.ref(`users/${uid}/favoriteChartData`).push(payload).then((ref)=>{
//                 dispatch(addSavedChart({
//                   id : ref.key,
//                   ...payload
//                 }))

//             })
//         }

//     }

// };

export const startAddSavedChart = (term = '', limit, dataSaved) => {
  return (dispatch, getState) => {
    // const uid = getState().auth.uid;
    const state = getState().favoriteChartData;
    const date = moment().format('YYYY-MM-DD HH:mm');
    const payload = { term, limit, dataSaved, date };
    if (state.length === 0) {
      return axios.post('/savedChart', payload).then(res => {
        dispatch(
          addSavedChart({
            id: res.data._id,
            ...payload
          })
        );
      });
    } else if (
      state.some(val => {
        return isEqual(val.dataSaved, payload.dataSaved);
      }) ||
      state.some(val => {
        return (
          val.term === payload.term &&
          val.limit === payload.limit &&
          moment().diff(moment(val.date, 'YYYY-MM-DD HH:mm'), 'hours') < 24
        );
      })
    ) {
    } else {
      return axios.post('/savedChart', payload).then(res => {
        dispatch(
          addSavedChart({
            id: res.data._id,
            ...payload
          })
        );
      });
    }
  };
};

export const removeSavedChart = id => ({
  type: REMOVE_SAVED_CHART,
  id
});

export const startRemoveSavedChart = id => {
  return (dispatch, getState) => {
    axios.delete('/savedChart', { data: { id: id } }).then(() => {
      dispatch(removeSavedChart(id));
    });
  };
};

// export const startRemoveSavedChart = (id)=>{
//     return (dispatch,getState) => {
//         const uid = getState().auth.uid;
//         return database.ref(`users/${uid}/favoriteChartData/${id}`).remove().then(()=>{
//            dispatch(removeSavedChart( id ));
//         })

// }};
export const changingTerm = (term = '', limit = 25) => ({
  type: CHANGE_TERM,
  payload: {
    term,
    limit
  }
});

export const combineSentiment = (sentimentVariables = {}) => ({
  type: COMBINE_SENTIMENT,
  sentimentVariables
});
export const searchTerm = (result = {}) => ({
  type: SEARCH_TERM,
  result
});

export const searchSentiment = (sentiment = {}) => ({
  type: SEARCH_SENTIMENT,
  sentiment
});
export const loadingStatus = (loading = true) => ({
  type: CHANGE_LOADING,
  loading
});
export const startSearchTerm = () => {
  return (dispatch, getState) => {
    let term = getState().input.term;
    const inputLimit = getState().input.limit;
    r.search({
      query: term,
      limit: inputLimit
    }).then(searchResult => {
      dispatch(searchTerm(searchResult));
      dispatch(
        searchSentiment(
          searchResult.map(result =>
            sentiment.analyze(result.selftext.concat(' ', result.title))
          )
        )
      );
      const sentimentFromStore = getState().sentiment;
      let positiveWords = [];
      let negativeWords = [];
      let score = [];
      let comparative = [];
      sentimentFromStore.forEach(emotion => {
        positiveWords = emotion.positive.concat(positiveWords);
        negativeWords = emotion.negative.concat(negativeWords);
        score.unshift(emotion.score);
        comparative.unshift(emotion.comparative);
      });
      let countPositive = positiveWords.length;
      let countNegative = negativeWords.length;
      positiveWords = _.countBy(positiveWords);
      negativeWords = _.countBy(negativeWords);
      score = _.countBy(score);
      // console.log("pos",positiveWords);
      // console.log("neg",negativeWords);
      // console.log("score",score);

      dispatch(
        combineSentiment({
          countPositive,
          countNegative,
          positiveWords,
          negativeWords,
          comparative,
          score
        })
      );
      dispatch(loadingStatus(true));
    });
  };
};
