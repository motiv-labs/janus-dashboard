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

const RequestTransformerPlugin = ({ className }) => {
    const b = block(className);

    return (
        <div className={b('section')()}>
            <Row>
                <Row col>
                    <Label>Plugin Name</Label>
                    <Input input={{value: 'Request Transformer'}} disabled />
                </Row>
            </Row>
        </div>
    );
};

RequestTransformerPlugin.propTypes = propTypes;

export default RequestTransformerPlugin;
