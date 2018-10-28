import {SEARCH_TERM,CHANGE_TERM,SEARCH_SENTIMENT,COMBINE_SENTIMENT,ADD_SAVED_CHART,REMOVE_SAVED_CHART,SET_SAVED_CHART} from '../action-types';
import {r} from '../reddit-auth/reddit-auth';
import Sentiment from 'sentiment';
import _ from 'lodash';
import moment from 'moment';
import isEqual from 'react-fast-compare';
import uuidv1 from 'uuid/v1';
import database from '../firebase/firebase';
const sentiment = new Sentiment();
// let date = moment();

export const setSavedChart = (data={})=>({
    type: SET_SAVED_CHART,
    data
})
export const startSetSavedChart =()=>{
    return(dispatch)=>{
        return database.ref('favoriteChartData').once('value').then((snapshot)=>{
            const data = [];
            snapshot.forEach((childSnapshot)=>{
                data.push({
                    id:childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setSavedChart(data));
        });
    };
};

export const addSavedChart = (payload={}) =>({
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

export const startAddSavedChart = (term="",limit,dataSaved) =>{
    return (dispatch,getState)=>{
        const state = getState().favoriteChartData;
        const date = moment().format("YYYY-MM-DD HH:mm");
        const payload ={term,limit,dataSaved,date};
        if(state.length === 0){
            return database.ref('favoriteChartData').push(payload).then((ref)=>{
                dispatch(addSavedChart({
                  id : ref.key,
                  ...payload
                }))
                
            })
        }else if(state.some((val)=>{return isEqual(val.dataSaved,payload.dataSaved)}) || 
        state.some((val)=>{ return val.term === payload.term && 
            val.limit === payload.limit && 
            moment().diff(moment(val.date,"YYYY-MM-DD HH:mm"),'hours') < 24})){

        }else{
            return database.ref('favoriteChartData').push(payload).then((ref)=>{
                dispatch(addSavedChart({
                  id : ref.key,
                  ...payload
                }))
                
            })
        }
        
    }
    
};


export const removeSavedChart = (id)=>({
    type: REMOVE_SAVED_CHART,
    id
});

export const startRemoveSavedChart = (id)=>{
    return (dispatch) => {
        return database.ref(`favoriteChartData/${id}`).remove().then(()=>{
           dispatch(removeSavedChart( id )); 
        })
        
}};

export const changingTerm = (term="",limit=25) =>({
    type: CHANGE_TERM,
    payload: {
        term,
        limit
    }
    
});

export const combineSentiment = (sentimentVariables={}) =>({
    type: COMBINE_SENTIMENT,
    sentimentVariables
});
export const searchTerm = (result={}) => ({
    type: SEARCH_TERM,
    result
});

export const searchSentiment = (sentiment={}) => ({
    type: SEARCH_SENTIMENT,
    sentiment
});

export const startSearchTerm = ()=>{
    return (dispatch,getState)=> {
        let term = getState().input.term;
        const inputLimit = getState().input.limit;

        console.log(inputLimit);
        r.search({
            query: term,
            limit: inputLimit
          }).then((searchResult => {
            dispatch(searchTerm(searchResult));
            dispatch(searchSentiment((searchResult.map(result => sentiment.analyze(result.selftext.concat(' ',result.title))))));
            const sentimentFromStore = getState().sentiment;
            let positiveWords = [];
            let negativeWords = [];
            let score = [];
            let comparative =[];
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
            dispatch(combineSentiment({countPositive,countNegative,positiveWords,negativeWords,comparative,score}));
            
        }));
    }
};

