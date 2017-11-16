import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';

import block from '../../helpers/bem-cn';
import parse from '../../helpers/parse-value';

import Row from '../../modules/Layout/Row/Row';
import Label from '../../components/Label/Label';
import Input from '../../modules/inputs/Input';
import Control from '../../components/Control/Control';

import './AddDoubleFields.css';

const row = block('j-row');

const propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    config: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const AddDoubleFields = ({ config, name, title }) => {
    const passParse = config => config.type === 'number' ? parse : undefined;
    const renderMembers = ({ fields, config, hint, title }) => {
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
                        <Row className="double-fields" key={index} col>
                            <div className={row()}>
                                <div className={row('item', {pair: true})()}>
                                    <Field
                                        name={`${member}.${config[0].sufix}`}
                                        type={config[0].type}
                                        component={Input}
                                        placeholder={config[0].placeholder}
                                        parse={passParse(config[0])}
                                    />
                                </div>
                                <div className={row('item')()}>
                                    <Field
                                        name={`${member}.${config[1].sufix}`}
                                        type={config[1].type}
                                        component={Input}
                                        placeholder={config[1].placeholder}
                                        parse={passParse(config[1])}
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

    return (
        <div className="j-col__item">
            <FieldArray
                name={`${name}`}
                component={renderMembers}
                title={title}
                config={config}
            />
        </div>
    );
};

AddDoubleFields.propTypes = propTypes;

export default AddDoubleFields;
