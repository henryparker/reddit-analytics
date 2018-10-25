import {ADD_SAVED_CHART} from '../action-types';
import isEqual from 'react-fast-compare';

export default ( state = [] ,action)=>{
    switch(action.type){
        case ADD_SAVED_CHART:
            if(state.length === 0){
                let term = action.payload.term;
                let data = action.payload.savedChartData;
                let temp ={term,
                            id:action.payload.id,
                            date:action.payload.date,
                            dataSaved: [data]};
                return[
                    ...state,
                    temp
                ]
            }else{
                var index;
                if(state.some((val)=>{return val.dataSaved.some(val1=>{return isEqual(val1,action.payload.savedChartData)})})){
                    return state
                }else if(state.some((val,i)=>{index = i; return val.term == action.payload.term})){
                    let term = action.payload.term;
                    let data = action.payload.savedChartData;
                    let temp ={term,
                        id:action.payload.id,
                        date:action.payload.date,
                            dataSaved: [...state[index].dataSaved,data]};
                    // let temp2 = {dataSaved: [...state[index].dataSaved,data]};
                    // // return state.map((val,i)=>{if(i == index){
                    // //     return{
                    // //         ...state[index].dataSaved,dataSaved:data
                    // //     }}})
                    let newArray = state.slice();
                    newArray.splice(index,1,temp);

                    // console.log("state", state);

                    // console.log("index", index);
                    // console.log("temp", temp);
                    // console.log("temp3", temp3);

                    return [...newArray];
                    // if(state.length===1){
                    //     return [
                            
                    //         temp
                             
                    //  ] 
                    // }else{
                    //     return [
                    //        ...state.slice(0,index),
                    //        temp,
                    //        ...state.slice(index)
                           
                    // ] 
                    // }
                   
                
                }else{
                let term = action.payload.term;
                let data = action.payload.savedChartData;
                let temp ={term,
                             id:action.payload.id,
                             date:action.payload.date,
                            dataSaved: [data]};
                return[
                    ...state,
                    
                    temp
                ]
                }
            }
        default:
            return state;
    }
};
