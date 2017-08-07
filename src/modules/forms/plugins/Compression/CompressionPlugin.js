import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import block from '../../../../helpers/bem-cn';

import Row from '../../../Layout/Row/Row';
import Label from '../../../labels/Label';
import Input from '../../../inputs/Input';
import Radio from '../../../inputs/Radio/Radio';
import Hint from '../../../labels/Hint/Hint';
import ControlBar from '../ControlBar/ControlBar';

const propTypes = {
    className: PropTypes.string,
};

const CompressionPlugin = ({ className, name }) => {
    const b = block(className);

    return (
        <div className={b('section')()}>
            {/*<Row>
                <Row col>
                    <Label>Plugin Name</Label>
                    <Input input={{value: 'Compression'}} disabled />
                </Row>
            </Row>*/}
            <Row className={b('row')()} fullwidth>
                <Row col>
                    <Label>Plugin Name</Label>
                    <Input input={{value: 'Compression'}} disabled />
                </Row>
                <ControlBar name={name} />
            </Row>
        </div>
    );
};

CompressionPlugin.propTypes = propTypes;

export default CompressionPlugin;
