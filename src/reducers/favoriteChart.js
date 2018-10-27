import database from '../firebase/firebase';
import {ADD_SAVED_CHART,REMOVE_SAVED_CHART,SET_SAVED_CHART} from '../action-types';
import isEqual from 'react-fast-compare';
import moment from 'moment';
import _ from 'lodash';
import stringify from 'json-stringify-safe'
export default ( state = [] ,action)=>{
    // let endDate = Object.prototype.hasOwnProperty.call(action,"payload") && Object.prototype.hasOwnProperty.call(action.payload,"date") ? action.payload.date.clone() : moment();
    // endDate.add(1,'d');
    // let diff = Object.prototype.hasOwnProperty.call(action,"payload") && Object.prototype.hasOwnProperty.call(action.payload,"date") ? action.payload.date.diff(endDate,'hours'): "not yet";
    // console.log(diff);

    console.log(action);
    switch (action.type){
        case SET_SAVED_CHART:
            return action.data;
            
        case REMOVE_SAVED_CHART:
            return state.filter( (val) => val.id !== action.id);
        
        
        case ADD_SAVED_CHART:
        // let dateComparable = moment(action.payload.date,"MM:DD:YY:HH");
        console.log("start");
            if(state.length === 0){
                let term = action.payload.term;
                let data = action.payload.savedChartData;
                let temp ={term,
                            limit: action.payload.limit,
                            id:action.payload.id,
                            date:action.payload.date,
                            dataSaved: data};
               
                // database.ref("favoriteChartData").once('value').then((snapshot)=>{
                //     const val=snapshot.val();
                //     console.log(val);
                // });
                database.ref("favoriteChartData").push(temp).then((val)=>console.log(val));
                return[
                    ...state,
                    temp
                ]
            }else{
                var index;
                if(state.some((val)=>{return isEqual(val.dataSaved,action.payload.savedChartData)})){
                    console.log("check",true);
                    return state
                }else if(state.some((val,i)=>{index = i; return val.term === action.payload.term && val.limit === action.payload.limit && moment().diff(moment(val.date,"YYYY-MM-DD HH:mm"),'hours') < 24})){
                    // let term = action.payload.term;
                    // let data = action.payload.savedChartData;
                    // let temp ={term,
                    //     limit: action.payload.limit,
                    //     id:action.payload.id,
                    //     date:action.payload.date,
                    //         dataSaved: [...state[index].dataSaved,data]};

                    // let newArray = state.slice();
                    // newArray.splice(index,1,temp);
                    // return [...newArray];
                    return state

                }else{
                let term = action.payload.term;
                let data = action.payload.savedChartData;
                let temp ={term,
                             id:action.payload.id,
                             limit: action.payload.limit,
                             date:action.payload.date,
                            dataSaved: data};
                database.ref("favoriteChartData").push(temp).then((val)=>console.log(val));
                return[
                    ...state,
                    temp
                ]
                }
            };

        default:
            return state;
    }
};
