import React, {Component} from 'react';
import { connect } from 'react-redux';
import {changingTerm,startSearchTerm} from '../actions/search';

import {Bar, Radar, Polar} from 'react-chartjs-2';
import SearchForm from './SearchForm';
import ListOfSavedAnalytics from './ListOfSavedAnalytics';
import moment from 'moment';
export class SavedChartDashboard extends Component{
    render(){
        return (
        <div>
        
        <br/>
        {/* {this.props.favoriteChartData.map(val=> val.dataSaved).map(val1=>val1)} */} 
        <ul>
        {this.props.favoriteChartData.map(val=><ListOfSavedAnalytics key={val.id} {...val}></ListOfSavedAnalytics>)}    
        </ul> 
        
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    changingTerm: (term)=> dispatch(changingTerm(term)),
    startSearchTerm: (result)=> dispatch(startSearchTerm(result))
});

const mapStateToProps = (state) => {
    return {
      sentiment : state.sentiment,
      combineSentiments : state.combineSentiments,
      favoriteChartData: state.favoriteChartData
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(SavedChartDashboard);