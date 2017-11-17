import R from 'ramda';
import { openResponseModal } from '../store/actions';

const errorHandler = dispatch => error => R.compose(
    dispatch,
    openResponseModal,
)({
    message: `${error}: ${error.response.data}`
});

export default errorHandler;
