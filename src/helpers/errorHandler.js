import R from 'ramda';
import { openResponseModal } from '../store/actions';

const generateMessage = error => {
    let details = '';
    if (error.response && error.response.data && error.response.data.error) {
        details = error.response.data.error;
    } else if (error.response && error.response.data) {
        details = error.response.data;
    } else if (error.response) {
        details = error.response;
    }
    return `${error} ${details}`;
};

const errorHandler = (dispatch, error) => {
    const message = generateMessage(error);
    dispatch(openResponseModal(message));
};

export default errorHandler;
