import React from 'react';
import PropTypes from 'prop-types';

import block from '../../../../helpers/bem-cn';

import Control from '../../../buttons/Control/Control';
import Tumbler from '../../../Tumbler/Tumbler';

import './ControlBar.css';

const b = block('j-plugin-controls');

const propTypes = {
    name: PropTypes.string.isRequired,
    removePlugin: PropTypes.func.isRequired,
};

const ControlBar = ({ name, removePlugin }) => {
    return (
        <div className={b('wrapper')}>
            <div className={b()}>
                <div className={b('item')}>
                    <Tumbler
                        name={name}
                    />
                </div>
                <Control icon="delete" onClick={removePlugin} />
            </div>
        </div>
    );
};

ControlBar.propTypes = propTypes;

export default ControlBar;
