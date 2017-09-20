import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modaliz from 'react-modaliz';

import {
    // openConfirmationModal,
    closeConfirmationModal,
} from '../../../store/actions';

const propTypes = {
    // className: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    needConfirm: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    // status: PropTypes.string.isRequired,
    // statusText: PropTypes.string.isRequired,
};

const defaultProps = {
    message: '',
};

const ConfirmationModal = ({
    // className,
    closeModal,
    message,
    needConfirm,
    onConfirm,
    // status,
    // statusText,
}) => {
    const handleClose = () => {
        closeModal();
    };
    // const handleConfirm = () => {
    //     onConfirm();
    // };

    return (
        <Modaliz
            className="j-confirmation"
            show={needConfirm}
            speed={500}
            onClose={handleClose}
        >
            {message}
            <button onClick={handleClose}>Cancel</button>
            <button onClick={onConfirm}>OK</button>
        </Modaliz>
    );
};

ConfirmationModal.propTypes = propTypes;
ConfirmationModal.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    const {
        message,
        needConfirm,
        onConfirm,
        // status,
    } = state.apiResponseModalReducer;

    return {
        message,
        needConfirm,
        onConfirm,
        // status,
    };
};

export default connect(
    mapStateToProps,
    {
        // openConfirmationModal,
        closeModal: closeConfirmationModal,
    },
)(ConfirmationModal);
