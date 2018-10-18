import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {changingTerm,startSearchTerm} from '../actions/search';
export class SearchForm extends Component{

    onChanging = (e)=>{
        const term = e.target.value;
        this.props.changingTerm(term);
    }

    onSubmit = (e)=>{
        e.preventDefault();
        this.props.startSearchTerm();
    }
    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="SearchTerms" value={this.props.term} onChange={this.onChanging}/>
                <input type="text" placeholder="SearchTerms" value={this.props.term} onChange={this.onChanging}/>
                <button >submit</button>
                <p/>
                <Link to="/">Posts Result</Link>
                <p/>
                <Link to="/analytics">Analytics page</Link>
            </form>
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

  export default connect(mapStateToProps,mapDispatchToProps)(SearchForm);