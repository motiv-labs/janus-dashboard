import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import block from '../../../helpers/bem-cn';

import {
    clearConfirmationModal,
    closeToaster,
} from '../../../store/actions';

import Icon from '../../../components/Icon/Icon';

import './Toaster.css';

const b = block('j-toaster');

const propTypes = {
    timeout: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

const Toaster = props => {

    const handleCloseToaster = () => {
        props.closeToaster();
        props.clearConfirmationModal();
    };

    const closeLater = () => {
        setTimeout(() => {
            handleCloseToaster();
        }, props.timeout || 2000);
    };

    if (!props.isOpen) return null;

    closeLater();

    return (
        <div className={b()}>
            <div className={b('left-part')}>
                <Icon
                    className={b('icon')()}
                    type="successful-white"
                />
            </div>
            <div className={b('right-part')}>
                {props.message}
            </div>
            <div
                className={b('close')}
                onClick={handleCloseToaster}
            >
                <Icon
                    type="close"
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const {
        isOpen,
        message,
    } = state.apiResponseModalReducer.toaster;

    return {
        isOpen,
        message,
    };
};

Toaster.propTypes = propTypes;

export default connect(
    mapStateToProps,
    { clearConfirmationModal, closeToaster },
)(Toaster);
