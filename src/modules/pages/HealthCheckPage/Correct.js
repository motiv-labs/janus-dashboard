import React from 'react';
import PropTypes from 'prop-types';

import block from '../../../helpers/bem-cn';

import Icon from '../../Icon/Icon';

const propTypes = {
    className: PropTypes.string,
};

const Correct = ({ className }) => {
    const b = block(className);

    return (
        <div className={b()}>
            <Icon type="correct" className={b('icon')()} />
            <p className={b('text')}>All services are currently available.</p>
        </div>
    );
};

Correct.propTypes = propTypes;

export default Correct;
