import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USERS } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  users
});

// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action),
//     users: users(state.users, action)
//   }
// }

export default moviesApp;