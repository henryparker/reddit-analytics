import {SEARCH_TERM, SEARCH_SENTIMENT} from '../action-types'

export default ( state = {} ,action)=>{
    switch(action.type){
        case SEARCH_TERM:
            return action.result;
        case SEARCH_SENTIMENT:
            return action.result;
        default:
            return state;
    }
};