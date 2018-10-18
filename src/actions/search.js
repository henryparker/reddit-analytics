import {SEARCH_TERM,CHANGE_TERM} from '../action-types';
import {r} from '../reddit-auth/reddit-auth';

export const changingTerm = (term="") =>({
    type: CHANGE_TERM,
    term
});


export const searchTerm = (result={}) => ({
    type: SEARCH_TERM,
    result
});

export const startSearchTerm =()=>{
    return (dispatch,getState)=> {
        let term = getState().term;
        console.log(term);
        r.search({
            query: term
          }).then((searchResult => dispatch(searchTerm(searchResult))));
    }
};