import {SEARCH_TERM,CHANGE_TERM,SEARCH_SENTIMENT} from '../action-types';
import {r} from '../reddit-auth/reddit-auth';
import Sentiment from 'sentiment';
import _ from 'lodash';
const sentiment = new Sentiment();

export const changingTerm = (term="",limit=25) =>({
    type: CHANGE_TERM,
    payload: {
        term,
        limit}
    
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
                
        }));
    }
};

