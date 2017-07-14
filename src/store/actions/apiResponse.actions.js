import {
  OPEN_RESPONSE_MODAL,
  CLOSE_RESPONSE_MODAL,
} from '../constants';

export const openResponseModal = (data) => {
  console.error('=======>', data);
  return {
    type: OPEN_RESPONSE_MODAL,
    payload: {
      status: data.statusText,
      message: data.data,
    },
  };
};

export const closeResponseModal = () => ({
  type: CLOSE_RESPONSE_MODAL,
});
