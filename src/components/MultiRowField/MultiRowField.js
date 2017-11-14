import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';

import block from '../../helpers/bem-cn';
import Row from '../../modules/Layout/Row/Row';
import Label from '../../modules/labels/Label';
import Input from '../../modules/inputs/Input';
import Hint from '../../modules/labels/Hint/Hint';
import Control from '../../components/Control/Control';

const row = block('j-row');

const propTypes = {
    name: PropTypes.string.isRequired,
    hint: PropTypes.string,
    placeholder: PropTypes.string,
    suffix: PropTypes.string,
    title: PropTypes.string,
};

class MultiRowField extends PureComponent {
    renderMembers = ({ fields, hint, placeholder, suffix, title }) => (
        <div>
            <div className={row()}>
                <Label>{ title } {placeholder}</Label>
                <Control
                    onClick={() => fields.push()}
                    icon="add"
                />
            </div>
            {
                hint &&
                    <Hint title>{ hint }</Hint>
            }
            {
                fields.map((member, index) =>
                    <Row className="double-fields" key={index} col>
                        <div className={row()}>
                            <div className={row('item')}>
                                <Field
                                    name={suffix ? `${member}.${suffix}` : `${member}`}
                                    type="text"
                                    component={Input}
                                    placeholder={placeholder ? placeholder : ''}
                                />
                            </div>
                            <div className={row('control')()}>
                                <Control
                                    onClick={() => fields.remove(index)}
                                    icon="remove"
                                />
                            </div>
                        </div>
                    </Row>
                )
            }
        </div>
    )

    render() {
        const { hint, name, placeholder, suffix, title } = this.props;

        return (
            <Row col>
                <FieldArray
                    name={`${name}`}
                    component={this.renderMembers}
                    hint={hint}
                    placeholder={placeholder}
                    suffix={suffix}
                    title={title}
                />
            </Row>
        );
    }
};

MultiRowField.propTypes = propTypes;

export default MultiRowField;
