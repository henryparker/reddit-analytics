import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {changingTerm,startSearchTerm, combineSentiment,addSavedChart} from '../actions/search';
import _ from 'lodash';
export class SearchForm extends Component{

    onTermChange = (e)=>{
        const term = e.target.value;
        const limit = this.props.input.limit;
        this.props.changingTerm(term,limit);
    }

    onLimitChange = (e)=>{
        const limit = parseInt(e.target.value);
        const term = this.props.input.term;
        this.props.changingTerm(term,limit);
    } 

    onSubmit = (e)=>{
        e.preventDefault();
        // this.props.startSearchTerm();
    }
    render(){
        let buttonFavs = !_.isEmpty(this.props.combineSentiments) ? <button onClick={()=>{this.props.addSavedChart(this.props.input.term,this.props.input.limit,this.props.combineSentiments)}}>save</button> :<span></span>

        
        return(
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="SearchTerms" value={this.props.input.term} onChange={this.onTermChange}/>
                <input type="number" max="250" placeholder="SearchLimits" value={this.props.input.limit} onChange={this.onLimitChange}/>
                <button onClick={()=>this.props.startSearchTerm()} >submit</button>
                {buttonFavs}
                <br/>
                <Link to="/">Posts Result</Link>    
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/analytics">Analytics page</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/saved-analytics">Saved Analytics</Link>

            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    changingTerm: (term,limit)=> dispatch(changingTerm(term,limit)),
    startSearchTerm: ()=> dispatch(startSearchTerm()),
    addSavedChart: (term,limit,savedChartData)=> dispatch(addSavedChart(term,limit,savedChartData)),

});

const mapStateToProps = (state) => {
    return {
      input: state.input,
      result: state.result,
      combineSentiments: state.combineSentiments
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(SearchForm);