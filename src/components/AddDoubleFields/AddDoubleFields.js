import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';

import block from '../../helpers/bem-cn';

import Row from '../../modules/Layout/Row/Row';
import Label from '../../modules/labels/Label';
import Input from '../../modules/inputs/Input';
import Control from '../../modules/buttons/Control/Control';

const row = block('j-row');

const propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    config: PropTypes.object.isRequired,
};

class WeightTargets extends PureComponent {
    renderMembers = ({ fields, config, hint, title }) => {
        const parse = value => value && parseInt(value);
        const { sufix } = config;

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
                    fields.map((member, index) => (
                        <Row key={index} col>
                            <div className={row()}>
                                <div className={row('item', {pair: true})}>
                                    <Field
                                        name={`${member}.${config[0].sufix}`}
                                        type={config[0].type}
                                        component={Input}
                                        placeholder={config[0].placeholder}
                                        parse={config[0].type === 'number' && parse}
                                    />
                                </div>
                                <div className={row('item')}>
                                    <Field
                                        name={`${member}.${config[1].sufix}`}
                                        type={config[1].type}
                                        component={Input}
                                        placeholder={config[1].placeholder}
                                        parse={config[1].type === 'number' && parse}
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
                    ))
                }
            </div>
        );
    };

    render() {
        const { config, name, title } = this.props;

        return (
            <div className="j-col__item">
                <FieldArray
                    name={`${name}`}
                    component={this.renderMembers}
                    title={title}
                    config={config}
                />
            </div>
        );
    }
};

WeightTargets.propTypes = propTypes;

export default WeightTargets;
