import React, {Component} from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import {changingTerm,startSearchTerm,startAddSavedChart} from '../actions/search';
import {startLogout} from '../actions/auth';
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
        // this.props.history.push('/analytics');
        // this.props.startSearchTerm();
    }
    render(){
        let buttonFavs = !_.isEmpty(this.props.combineSentiments) ? <button className="btn btn-success btn-lg m-1" onClick={()=>{
            this.props.startAddSavedChart(this.props.input.term,this.props.input.limit,this.props.combineSentiments);
            }}>save</button> :<span></span>

        
        return(
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder="SearchTerms" value={this.props.input.term} onChange={this.onTermChange}/>
                <input type="number" max="250" placeholder="SearchLimits" value={this.props.input.limit} onChange={this.onLimitChange}/>
                <button className="btn btn-primary btn-lg m-1" onClick={()=>{this.props.startSearchTerm(); this.props.history.push('/analytics')}} >submit</button>
                {buttonFavs}
                <button className="btn btn-danger btn-lg m-1" onClick={startLogout()}>Logout</button>
                <br/>
                <NavLink to="/dashboard">Posts Result</NavLink>    
                &nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink to="/analytics">Analytics page</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink to="/saved-analytics">Saved Analytics</NavLink>
                
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    changingTerm: (term,limit)=> dispatch(changingTerm(term,limit)),
    startSearchTerm: ()=> dispatch(startSearchTerm()),
    startAddSavedChart: (term,limit,dataSaved)=> dispatch(startAddSavedChart(term,limit,dataSaved)),
    startLogout: ()=> dispatch(startLogout())
});

const mapStateToProps = (state) => {
    return {
      input: state.input,
      result: state.result,
      combineSentiments: state.combineSentiments
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(SearchForm);