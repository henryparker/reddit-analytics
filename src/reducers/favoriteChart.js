import {ADD_SAVED_CHART} from '../action-types';
import isEqual from 'react-fast-compare';

export default ( state = [] ,action)=>{
    switch(action.type){
        case ADD_SAVED_CHART:
            if(state.length === 0){
                return[
                    ...state,
                    action.payload
                ]
            }else{
                if(state.some((val)=>{return isEqual(val,action.payload)})){
                    return state
                }else{
                    return [
                        ...state,
                        action.payload
                    ]
                }
            }
        default:
            return state;
    }
};

