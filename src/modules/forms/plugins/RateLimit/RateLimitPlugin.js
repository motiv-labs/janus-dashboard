import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import block from '../../../../helpers/bem-cn';

import Row from '../../../Layout/Row/Row';
import Label from '../../../labels/Label';
import Input from '../../../inputs/Input';
import Radio from '../../../inputs/Radio/Radio';
import Hint from '../../../labels/Hint/Hint';

const propTypes = {
    className: PropTypes.string,
};

const RateLimitPlugin = ({ className }) => {
    const b = block(className);

    return (
        <div className={b('section')()}>
            <Row>
                <Row col>
                    <Label>Plugin Name</Label>
                    <Input input={{value: 'Rate Limit'}} disabled />
                </Row>
            </Row>
        </div>
    );
};

RateLimitPlugin.propTypes = propTypes;

export default RateLimitPlugin;
