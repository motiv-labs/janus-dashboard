import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

// here import all your reducers from all your modules
import userSessionReducer from './userSession.reducer';
import healthcheckReducer from './healthcheck.reducer';
import apiResponseModalReducer from './apiResponse.reducer';
import apiListReducer from './apiList.reducer';
import apiReducer from './api.reducer';
import searchReducer from './search.reducer';
import requestReducer from './request.reducer';

export default combineReducers({
  // here combine all reducers:
    userSessionReducer,
    healthcheckReducer,
    apiResponseModalReducer,
    apiListReducer,
    apiReducer,
    searchReducer,
    requestReducer,
    form: formReducer,
    routing: routerReducer,
});
