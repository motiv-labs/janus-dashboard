import R from 'ramda';
import { openResponseModal } from '../store/actions';

const errorHandler = dispatch => error => R.compose(
    dispatch,
    openResponseModal,
)({
    message: error.response ? error.response.data.error : `${error}`,
});

export default errorHandler;
