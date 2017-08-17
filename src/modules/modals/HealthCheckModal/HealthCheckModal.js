import React from 'react';
import PropTypes from 'prop-types';
import Modaliz from 'react-modaliz';

import block from '../../../helpers/bem-cn';

const propTypes = {
    className: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    problems: PropTypes.arrayOf(PropTypes.object).isRequired,
    redirectOnClose: PropTypes.func,
    statusText: PropTypes.string.isRequired,
};

const defaultProps = {
    message: '',
    problems: [],
    statusText: '',
};

const HealthCheckModal = ({
    className,
    closeModal,
    isOpen,
    message,
    problems,
    redirectOnClose,
    statusText,
}) => {
    const b = block(className);
    const m = block('j-modal');
    const handleClose = () => {
        closeModal();

        if (redirectOnClose) {
            redirectOnClose();
        }
    };

    return (
        <Modaliz
            className={m()}
            show={isOpen}
            speed={500}
            text={message}
            title={statusText}
            onClose={handleClose}
        >
            <div className={b('head')()}>
                <h1 className={b('title').mix(m('title'))}>{statusText}</h1>
                <h2 className={b('subtitle')}>{message}</h2>
            </div>
            {
                problems.map(item => (
                    <p className={b('text')}>{item.name} : {item.message}</p>
                ))
            }
        </Modaliz>
    );
};

HealthCheckModal.propTypes = propTypes;
HealthCheckModal.defaultProps = defaultProps;

export default HealthCheckModal;
