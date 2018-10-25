import React, {Component} from 'react';
import { connect } from 'react-redux';
import {changingTerm,startSearchTerm} from '../actions/search';

import {Bar, Radar, Polar} from 'react-chartjs-2';
import SearchForm from './SearchForm';
export class IndividualSavedAnalytic extends Component{
    render(){
        console.log("individual",this.props.favoriteChartData);
        return (
        <div>
        <SearchForm></SearchForm>
        <br/>
        <p className="h2">Saved data from {this.props.favoriteChartData.date.format('MMMM Do, YYYY')} for term {this.props.favoriteChartData.term}</p>
        <br/>
        {this.props.favoriteChartData.dataSaved.map(val1=>val1)}

        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    changingTerm: (term)=> dispatch(changingTerm(term)),
    startSearchTerm: (result)=> dispatch(startSearchTerm(result))
});

const mapStateToProps = (state,props) => {
    return {
      sentiment : state.sentiment,
      combineSentiments : state.combineSentiments,
      favoriteChartData: state.favoriteChartData.find((favoriteChartData)=>favoriteChartData.id === props.match.params.id)
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(IndividualSavedAnalytic);