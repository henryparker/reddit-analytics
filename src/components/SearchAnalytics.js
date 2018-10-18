import React, {Component} from 'react';
import { connect } from 'react-redux';
import {changingTerm,startSearchTerm} from '../actions/search';
export class SearchAnalitics extends Component{

    render(){
        return(
            <p>this will be analytics page</p>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    changingTerm: (term)=> dispatch(changingTerm(term)),
    startSearchTerm: (result)=> dispatch(startSearchTerm(result))
});

const mapStateToProps = (state) => {
    return {
      term: state.term,
      result: state.result
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(SearchAnalitics);