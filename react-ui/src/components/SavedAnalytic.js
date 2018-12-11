// import React, {Component} from 'react';
// import { connect } from 'react-redux';
// import {changingTerm,startSearchTerm} from '../actions/search';

// import {Bar, Radar, Polar} from 'react-chartjs-2';
// import SearchForm from './SearchForm';
// export class SavedAnalytic extends Component{
//     render(){
//         return (
//         <div>
//             <SearchForm></SearchForm>
//           <h1>This will be saved analytics</h1>
          
//           {this.props.favoriteChartData.map(val=> val.dataSaved).map(val1=>val1)}
//         </div>
//         )
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
//     changingTerm: (term)=> dispatch(changingTerm(term)),
//     startSearchTerm: (result)=> dispatch(startSearchTerm(result))
// });

// const mapStateToProps = (state) => {
//     return {
//       sentiment : state.sentiment,
//       combineSentiments : state.combineSentiments,
//       favoriteChartData: state.favoriteChartData
//     };
//   };

//   export default connect(mapStateToProps,mapDispatchToProps)(SavedAnalytic);