import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

// import block from '../../../../helpers/bem-cn';

import Row from '../../../../Layout/Row/Row';
import Label from '../../../../labels/Label';
import Input from '../../../../inputs/Input';

const propTypes = {
    name: PropTypes.string.isRequired,
    keyName: PropTypes.string.isRequired,
    valueName: PropTypes.string.isRequired,
};

const KeyValueRow = ({ keyName, name, valueName }) => {
    console.error(name);
    return (
        <Row>
            <Row col>
                <Field
                    name={`${keyName}.config.limit.value`}
                    type="text"
                    placeholder="Key"
                    component={Input}
                />
            </Row>
            <Row col>
                <Field
                    name={`${valueName}.config.limit.units`}
                    type="text"
                    placeholder="Value"
                    component={Input}
                />
            </Row>
        </Row>
    );
};

KeyValueRow.propTypes = propTypes;

export default KeyValueRow;
