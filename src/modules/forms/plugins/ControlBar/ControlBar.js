import React from 'react';

import block from '../../../../helpers/bem-cn';

import Icon from '../../../Icon/Icon';
import Tumbler from '../../../Tumbler/Tumbler';

import './ControlBar.css';

const b = block('j-plugin-controls');

const ControlBar = ({ name, enabled, removePlugin }) => {
    return (
        <div className={b('wrapper')}>
            <div className={b()}>
                <div className={b('item')}>
                    <Tumbler
                        name={name}
                    />
                </div>
                <span onClick={removePlugin}><Icon type="delete" /></span>
            </div>
        </div>
    );
};

export default ControlBar;
