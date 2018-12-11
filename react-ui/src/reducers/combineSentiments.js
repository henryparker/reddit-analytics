import {COMBINE_SENTIMENT} from '../action-types'
export default ( state = {} ,action)=>{
    switch(action.type){
        case COMBINE_SENTIMENT: 
            return action.sentimentVariables;
        default:
            return state;
    }
};