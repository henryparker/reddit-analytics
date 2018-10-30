import {SEARCH_TERM} from '../action-types'

export default ( state = {} ,action)=>{
    switch(action.type){
        case SEARCH_TERM:
            return action.result;
        default:
            return state;
    }
};