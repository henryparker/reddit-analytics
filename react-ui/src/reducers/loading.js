import {CHANGE_LOADING} from '../action-types';

export default ( state = true ,action)=>{

    switch (action.type){
        case CHANGE_LOADING:
            return action.loading;
        
        default:
            return state;
    }
}