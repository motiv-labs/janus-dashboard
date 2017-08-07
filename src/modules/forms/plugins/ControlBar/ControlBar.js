import React from 'react';
import { Field } from 'redux-form';

import block from '../../../../helpers/bem-cn';

import Icon from '../../../Icon/Icon';
import Tumbler from '../../../Tumbler/Tumbler';

import './ControlBar.css';

const b = block('j-plugin-controls');

const ControlBar = ({ name, enabled }) => {
    return (
        <div className={b('wrapper')}>
            <div className={b()}>
                <Tumbler
                    name={name}
                />
                <span><Icon type="delete" /></span>
            </div>
        </div>
    );
};

export default ControlBar;
