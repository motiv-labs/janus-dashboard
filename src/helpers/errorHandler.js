import R from 'ramda';
import { openResponseModal } from '../store/actions';

const errorHandler = dispatch => error => R.compose(
    dispatch,
    openResponseModal,
)({
    // Show error message from server if there is one
    message: error.response.data.error ?
             error.response.data.error :
             '',
});

export default errorHandler;
