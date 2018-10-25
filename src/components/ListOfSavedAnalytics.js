import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ListOfSavedAnalytics = ({ term="",date=moment(),id=123,limit=25 }) => (
  <li className="text-left list-group-item text-secondary">
  <Link className="list-item" to={`/saved-analytics/${id}`}>
      {date.format('MMMM Do, YYYY')}
      &nbsp;&nbsp;&nbsp;&nbsp;
      Term: {term}
      &nbsp;&nbsp;&nbsp;&nbsp;
      Sample#: {limit}
      <br/>
      {/* <h3 className="list-item__title">{date.format('MMMM Do, YYYY')}</h3>
      <span className="list-item__sub-title">{term}</span> */}
  </Link>
  </li>
);

export default ListOfSavedAnalytics;
