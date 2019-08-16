import { SEARCH_SENTIMENT } from '../action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_SENTIMENT:
      return action.sentiment;
    default:
      return state;
  }
};
