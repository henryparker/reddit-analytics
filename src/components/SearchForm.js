import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {changingTerm,startSearchTerm} from '../actions/search';
export class SearchForm extends Component{

    onTermChange = (e)=>{
        const term = e.target.value;
        const limit = this.props.input.limit;
        this.props.changingTerm(term,limit );
    }

    onLimitChange = (e)=>{
        const limit = parseInt(e.target.value);
        const term = this.props.input.term;
        this.props.changingTerm(term,limit);
    } 

    onSubmit = (e)=>{
        e.preventDefault();
        this.props.startSearchTerm();
    }
    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="SearchTerms" value={this.props.input.term} onChange={this.onTermChange}/>
                <input type="number" placeholder="SearchLimits" value={this.props.input.limit} onChange={this.onLimitChange}/>
                <button >submit</button>
                <br/>
                <Link to="/">Posts Result</Link>    
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/analytics">Analytics page</Link>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    changingTerm: (term,limit)=> dispatch(changingTerm(term,limit)),
    startSearchTerm: ()=> dispatch(startSearchTerm())
});

const mapStateToProps = (state) => {
    return {
      input: state.input,
      result: state.result
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(SearchForm);