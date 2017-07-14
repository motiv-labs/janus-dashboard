import {
  OPEN_RESPONSE_MODAL,
  CLOSE_RESPONSE_MODAL,
} from '../constants';

const initialState = {
  isOpen: false,
  status: null,
  message: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_RESPONSE_MODAL: {
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        isOpen: true,
      };
    }
    case CLOSE_RESPONSE_MODAL: {
      return initialState;
    }
    default:
      return state;
  }
}
