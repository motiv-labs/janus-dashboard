import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

// here import all your reducers from all your modules
import userSessionReducer from './userSession.reducer';
import apiResponseModalReducer from './apiResponse.reducer';
import apiListReducer from './apiList.reducer';
import apiReducer from './api.reducer';
import searchReducer from './search.reducer';

export default combineReducers({
  // here combine all reducers:
    userSessionReducer,
    apiResponseModalReducer,
    apiListReducer,
    apiReducer,
    searchReducer,
    form: formReducer,
    routing: routerReducer,
});
