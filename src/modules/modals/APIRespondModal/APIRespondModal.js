import React from 'react';
import PropTypes from 'prop-types';
import Modaliz from 'react-modaliz';

const propTypes = {
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    redirectOnClose: PropTypes.func.isRequired,
    statusText: PropTypes.string.isRequired,
};

const defaultProps = {
    statusText: '',
};

const APIRespondModal = (props) => {
    const handleClose = () => {
        props.closeModal();

        if (props.redirectOnClose) {
            props.redirectOnClose();
        }
    };

    return (
    <Modaliz
      show={props.isOpen}
      simple
      speed={500}
      text={props.message}
      title={props.statusText}
      onClose={handleClose}
    />
  );
};

APIRespondModal.propTypes = propTypes;
APIRespondModal.defaultProps = defaultProps;

export default APIRespondModal;
