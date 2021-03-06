import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  changingTerm,
  startSearchTerm,
  startAddSavedChart,
  loadingStatus
} from '../actions/search';
import { startLogout } from '../actions/auth';
import swal from 'sweetalert';
import { startLogin } from '../actions/auth';
import _ from 'lodash';
export class SearchForm extends Component {
  onTermChange = e => {
    const term = e.target.value;
    const limit = this.props.input.limit;
    this.props.changingTerm(term, limit);
  };

  onLimitChange = e => {
    const limit = parseInt(e.target.value);
    const term = this.props.input.term;
    this.props.changingTerm(term, limit);
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.history.push('/analytics');
    // this.props.startSearchTerm();
  };
  render() {
    let buttonFavs = !_.isEmpty(this.props.combineSentiments) ? (
      <button
        className="btn btn-info btn-lg m-1"
        onClick={() => {
          if (this.props.isAuthenticated) {
            this.props.startAddSavedChart(
              this.props.input.term,
              this.props.input.limit,
              this.props.combineSentiments
            );
          } else {
            // alert("please sign in first");
            swal({
              title: 'Please Sign in First',
              icon: 'warning'
            });
          }
        }}
      >
        save
      </button>
    ) : (
      <span></span>
    );

    let loginLogoutButton = this.props.isAuthenticated ? (
      <button className="btn btn-danger btn-lg m-1" onClick={startLogout()}>
        Logout
      </button>
    ) : (
      <button className="btn btn-success btn-lg m-1" onClick={startLogin()}>
        Login
      </button>
    );
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="SearchTerms"
          value={this.props.input.term}
          onChange={this.onTermChange}
        />
        <input
          type="number"
          max="250"
          placeholder="SearchLimits"
          value={this.props.input.limit}
          onChange={this.onLimitChange}
        />
        <button
          className="btn btn-primary btn-lg m-1"
          onClick={() => {
            this.props.startSearchTerm();
            this.props.loadingStatus(false);
            this.props.history.push('/analytics');
          }}
        >
          submit
        </button>
        {loginLogoutButton}
        {buttonFavs}
        <br />
        <NavLink to="/">Posts Result</NavLink>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink to="/analytics">Analytics page</NavLink>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink
          onClick={() => {
            if (!this.props.isAuthenticated) {
              // alert("please sign in first");
              swal({
                title: 'Please Sign in First',
                icon: 'warning'
              });
            }
          }}
          to="/saved-analytics"
        >
          Saved Analytics
        </NavLink>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changingTerm: (term, limit) => dispatch(changingTerm(term, limit)),
  startSearchTerm: () => dispatch(startSearchTerm()),
  startAddSavedChart: (term, limit, dataSaved) =>
    dispatch(startAddSavedChart(term, limit, dataSaved)),
  startLogout: () => dispatch(startLogout()),
  startLogin: () => dispatch(startLogin()),
  loadingStatus: loading => dispatch(loadingStatus(loading))
});

const mapStateToProps = state => {
  return {
    input: state.input,
    result: state.result,
    combineSentiments: state.combineSentiments,
    isAuthenticated: !!state.auth.uid
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);
