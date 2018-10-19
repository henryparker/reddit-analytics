import React, {Component} from 'react';
import { connect } from 'react-redux';
import {changingTerm,startSearchTerm} from '../actions/search';
import _ from 'lodash';

export class SearchAnalitics extends Component{

    render(){
        let results = this.props && this.props.sentiment.length > 0? 
        this.props.sentiment.map(result=> 
        <li class="text-left list-group-item text-primary" >
        <h1>score : {result.score}</h1>
        <br/>
        <h1>negative : {result.negative.length > 0 ? _.join(result.negative, ', ') : <p>none</p> }</h1>
        <br></br>
        <h1>positive : {result.positive.length > 0 ? _.join(result.positive, ', ') : <p>none</p>}</h1>
        </li>) : 
        <p>no result</p>;
        return(
            <ul>
                {results}
            </ul>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    changingTerm: (term)=> dispatch(changingTerm(term)),
    startSearchTerm: (result)=> dispatch(startSearchTerm(result))
});

const mapStateToProps = (state) => {
    return {
      sentiment : state.sentiment
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(SearchAnalitics);