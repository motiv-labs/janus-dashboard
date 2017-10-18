import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';

import block from '../../../../../helpers/bem-cn';

import Row from '../../../../Layout/Row/Row';
import Label from '../../../../labels/Label';
import Input from '../../../../inputs/Input';
import Control from '../../../../buttons/Control/Control';

const row = block('j-row');

const propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
};

class WeightTargets extends PureComponent {
    renderMembers = ({ fields, hint, title }) => {
        const parse = value => value && parseInt(value);

        return (
            <div>
                <div className={row()}>
                    <Label>{ title }</Label>
                    <Control
                        onClick={() => fields.push({})}
                        icon="add"
                    />
                </div>
                {
                    fields.map((member, index) => {
                        console.warn('mem', member);

                        return (
                            <Row key={index} col>
                                <div className={row()}>
                                    <div className={row('item', {pair: true})}>
                                        <Field
                                            name={`${member}.target`}
                                            type="text"
                                            component={Input}
                                            placeholder="Target"
                                        />
                                    </div>
                                    <div className={row('item')}>
                                        <Field
                                            name={`${member}.weight`}
                                            type="number"
                                            component={Input}
                                            placeholder="Weight"
                                            parse={parse}
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
                        );
                    })
                }
            </div>
        );
    };

    render() {
        const { name, title } = this.props;

        return (
            <div className="j-col__item">
                <FieldArray
                    name={`${this.props.name}`}
                    component={this.renderMembers}
                    title={title}
                />
            </div>
        );
    }
};

WeightTargets.propTypes = propTypes;

export default WeightTargets;
