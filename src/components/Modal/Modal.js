import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modaliz from 'react-modaliz';

import block from '../../helpers/bem-cn';

import './Modal.css';

const propTypes = {
    closeModal: PropTypes.func.isRequired,
    needConfirm: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // buttons: PropTypes.arrayOf(),
};

const defaultProps = {
    message: '',
};

const b = block('j-confirmation');

const ConfirmationModal = ({
    closeModal,
    message,
    needConfirm,
    onConfirm,
    title,
    buttons,
}) => {
    const handleClose = () => {
        closeModal();
    };

    return (
        <Modaliz
            className={b()}
            show={needConfirm}
            speed={500}
            onClose={handleClose}
            discardDefaults
        >
            <div className={b('inner')}>
                <div className={b('title')}>
                    {title}
                </div>
                <div className={b('body')}>
                    <div className={b('text')}>
                        {message}
                    </div>
                </div>
            </div>
            <div className={b('buttons-group').mix('j-buttons__wrapper')}>
                { buttons }
            </div>
        </Modaliz>
    );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;

// const mapStateToProps = (state) => {
//     const {
//         message,
//         needConfirm,
//         onConfirm,
//         title,
//     } = state.apiResponseModalReducer.confirmationModal;

//     return {
//         message,
//         needConfirm,
//         onConfirm,
//         title,
//     };
// };

// export default connect(
//     mapStateToProps,
//     {
//         closeModal: clearConfirmationModal,
//     },
// )(ConfirmationModal);
