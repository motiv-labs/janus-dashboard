import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';

import block from '../../../helpers/bem-cn';

import Icon from '../../Icon/Icon';

const propTypes = {
    className: PropTypes.string,
};

// temporary inline styles untill designer will provide warning icon
const style = {
    color: 'red',
    fontSize: '30px',
};

const Incorrect = ({ className }) => {
    const b = block(className);

    return (
        <div className={b()}>
            {/*<Icon type="correct" className={b('icon')()} />*/}
            <h1 style={style}>!</h1> {/* @TODO: REMOVE after designer will provide icon */}
            <p className={b('text')}>
                Some services are unvailable. Check it on Health Check list <Link to="/healthcheck">here</Link>.
            </p>
        </div>
    );
};

Incorrect.propTypes = propTypes;

export default Incorrect;
