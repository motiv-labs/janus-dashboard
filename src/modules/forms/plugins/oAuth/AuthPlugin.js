import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import block from '../../../../helpers/bem-cn';

import Row from '../../../Layout/Row/Row';
import Label from '../../../labels/Label';
import Input from '../../../inputs/Input';
import Hint from '../../../labels/Hint/Hint';
import ControlBar from '../ControlBar/ControlBar';

const propTypes = {
    className: PropTypes.string,
};

const AuthPlugin = ({ className, name }) => {
    const b = block(className);

    return (
        <div className={b('section')()}>
            <Row fullwidth>
                <Row col>
                    <Label>Plugin Name</Label>
                    <Input input={{value: 'oAuth'}} disabled />
                </Row>
                <ControlBar name={name} />
            </Row>
            <Row className={b('row')()} fullwidth>
                <Row col>
                    <Label>Servewr Name</Label>
                    <Field
                        name="config.server_name"
                        type="text"
                        placeholder="Choose"
                        component={Input}
                    />
                    <Hint>The server that the Gateway will use as the oauth provider for requests to the listen_path.</Hint>
                </Row>
            </Row>
        </div>
    );
};

AuthPlugin.propTypes = propTypes;

export default AuthPlugin;
