import React from 'react';
import PropTypes from 'prop-types';

import block from '../../../helpers/bem-cn';

import InfoPanel from '../../../components/InfoPanel/InfoPanel';

import Icon from '../../Icon/Icon';

const propTypes = {
    className: PropTypes.string,
};

const Correct = ({ className }) => {
    const b = block(className);

    return (
        <InfoPanel
            icon={<Icon type="correct" className={b('icon')()} />}
            text="All services are currently available."
        />
    );
};

Correct.propTypes = propTypes;

export default Correct;
