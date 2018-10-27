import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {startRemoveSavedChart} from '../actions/search';

class ListOfSavedAnalytics extends Component{
      render(){
      return(
  <li key={this.props.id} className="text-left list-group-item text-secondary">
  <Link className="list-item" to={`/saved-analytics/${this.props.id}`}>
      {this.props.date}
      &nbsp;&nbsp;&nbsp;&nbsp;
      Term: {this.props.term}
      &nbsp;&nbsp;&nbsp;&nbsp;
      Sample#: {this.props.limit}
      <br/>
      
      {/* <h3 className="list-item__title">{date.format('MMMM Do, YYYY')}</h3>
      <span className="list-item__sub-title">{term}</span> */}
  </Link>
  {console.log(this.props.id)}
  <button onClick={()=>this.props.startRemoveSavedChart(this.props.id)}>Remove</button>
  </li>
            )
      } 
}

const mapDispatchToProps = (dispatch) => ({
  // changingTerm: (term,limit)=> dispatch(changingTerm(term,limit)),
  // startSearchTerm: ()=> dispatch(startSearchTerm()),
  startRemoveSavedChart: (id)=> dispatch(startRemoveSavedChart(id))
});

const mapStateToProps = (state) => {
  return {
    input: state.input,
    result: state.result
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ListOfSavedAnalytics);
