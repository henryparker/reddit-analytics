//typing Reducer
import {CHANGE_TERM} from '../action-types'
const term = "";
export default ( state = term,action)=>{
    switch(action.type){
        case CHANGE_TERM:
            return action.term;
        default:
            return state;
    }
};