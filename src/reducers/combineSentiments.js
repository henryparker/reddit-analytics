import {COMBINE_SENTIMENT} from '../action-types'
import database from '../firebase/firebase';
export default ( state = {} ,action)=>{
    switch(action.type){
        case COMBINE_SENTIMENT:
            let sentimentVariables = action.sentimentVariables;
            // database.ref().set({
            //     sentimentVariables
            //     });        
            
            return action.sentimentVariables;
        default:
            return state;
    }
};