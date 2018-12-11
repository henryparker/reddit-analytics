import {ADD_SAVED_CHART,REMOVE_SAVED_CHART,SET_SAVED_CHART} from '../action-types';
export default ( state = [] ,action)=>{
    // let endDate = Object.prototype.hasOwnProperty.call(action,"payload") && Object.prototype.hasOwnProperty.call(action.payload,"date") ? action.payload.date.clone() : moment();
    // endDate.add(1,'d');
    // let diff = Object.prototype.hasOwnProperty.call(action,"payload") && Object.prototype.hasOwnProperty.call(action.payload,"date") ? action.payload.date.diff(endDate,'hours'): "not yet";
    // console.log(diff);

    switch (action.type){
        case SET_SAVED_CHART:
            return action.data;

        case REMOVE_SAVED_CHART:
            return state.filter( (val) => val.id !== action.id);
        
        
        case ADD_SAVED_CHART:
            return [
                ...state,
                action.payload
            ]
        // let dateComparable = moment(action.payload.date,"MM:DD:YY:HH");
        // console.log("start");
        //     if(state.length === 0){
        //         // let term = action.payload.term;
        //         // let data = action.payload.savedChartData;
        //         // let temp ={term,
        //         //             limit: action.payload.limit,
        //         //             id:action.payload.id,
        //         //             date:action.payload.date,
        //         //             dataSaved: data};
               
        //         // database.ref("favoriteChartData").once('value').then((snapshot)=>{
        //         //     const val=snapshot.val();
        //         //     console.log(val);
        //         // })

        //         // var payload;
                
                
                
        //         // let payload = "hi";
        //         // database.ref("favoriteChartData").push(action.payload).then((ref)=>{
        //         // action.payload.id = ref.key;
        //         // payload = action.payload;
        //         // });
        //         // return setTimeout(()=> {console.log("hi");return payload}, 10000);

        //         // let payload = tmp !== null ? tmp : "this is not gonna work";
        //         let payload = "looooooooooooooong"
        //         function add(){
        //             const data = {id:""}
        //             database.ref("favoriteChartData").push(action.payload).then((ref)=>{
        //                 Object.assign(data,{id:ref.key})
        //                 payload = action.payload;
        //                 });
        //             return data.id;
                    
        //         }
        //         console.log("add",add());
                

                
                

                
        //         // console.log("key out",action.payload.id);
        //         // return [
        //         //     action.payload
        //         // ]
            
        //     }else{
        //         var index;
        //         if(state.some((val)=>{return isEqual(val.dataSaved,action.payload.savedChartData)})){
        //             console.log("check",true);
        //             return state
        //         }else if(state.some((val,i)=>{index = i; return val.term === action.payload.term && val.limit === action.payload.limit && moment().diff(moment(val.date,"YYYY-MM-DD HH:mm"),'hours') < 24})){
        //             // let term = action.payload.term;
        //             // let data = action.payload.savedChartData;
        //             // let temp ={term,
        //             //     limit: action.payload.limit,
        //             //     id:action.payload.id,
        //             //     date:action.payload.date,
        //             //         dataSaved: [...state[index].dataSaved,data]};

        //             // let newArray = state.slice();
        //             // newArray.splice(index,1,temp);
        //             // return [...newArray];
        //             return state

        //         }else{
        //         // let term = action.payload.term;
        //         // let data = action.payload.savedChartData;
        //         // let temp ={term,
        //         //              id:action.payload.id,
        //         //              limit: action.payload.limit,
        //         //              date:action.payload.date,
        //         //             dataSaved: data};
        //         let key;
        //         database.ref("favoriteChartData").push(action.payload).then((ref)=>{
        //             key= ref.key;
        //             console.log("key in",key);
        //         });
        //         console.log("key out",key);
        //         action.payload.id = key;
        //         return [
        //             ...state,
        //             action.payload
        //         ]

        //         }
        //     };

        default:
            return state;
    }
};
