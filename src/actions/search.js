import {SEARCH_TERM,CHANGE_TERM,SEARCH_SENTIMENT,COMBINE_SENTIMENT,ADD_SAVED_CHART} from '../action-types';
import {r} from '../reddit-auth/reddit-auth';
import Sentiment from 'sentiment';
import _ from 'lodash';
import moment from 'moment';
import uuidv1 from 'uuid/v1';
const sentiment = new Sentiment();
// let date = moment();


export const addSavedChart = (term="",limit,savedChartData) =>({
    type: ADD_SAVED_CHART,
    payload:{
        term,
        limit,
        date: moment(),
        id:uuidv1(), 
        savedChartData 
    }
});

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

