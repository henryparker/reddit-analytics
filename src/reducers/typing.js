//typing Reducer
import {CHANGE_TERM} from '../action-types'
const term = "";
const limit = 25 ;
export default ( state = {term,limit},action)=>{
    switch(action.type){
        case CHANGE_TERM:
            return action.payload;
        default:
            return state;
    }
};