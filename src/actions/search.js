import {SEARCH_TERM,CHANGE_TERM,SEARCH_SENTIMENT} from '../action-types';
import {r} from '../reddit-auth/reddit-auth';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export const changingTerm = (term="") =>({
    type: CHANGE_TERM,
    term
});


export const searchTerm = (result={}) => ({
    type: SEARCH_TERM,
    result
});

export const searchSentiment = (result={}) => ({
    type: SEARCH_SENTIMENT,
    result
});

export const startSearchTerm =()=>{
    return (dispatch,getState)=> {
        let term = getState().term;
        console.log(term);
        r.search({
            query: "the",
            subreddit: "unpopularopinion"
          }).then((searchResult => {
            dispatch(searchTerm(searchResult));
            dispatch(searchSentiment((searchResult.map(result=> sentiment.analyze(result.selftext)))))
        }));
    }
};

