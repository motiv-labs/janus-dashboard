import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';

import PLACEHOLDER from '../../../configurations/placeholders.config';

import transformFormValues from '../../../helpers/transformFormValues';
import block from '../../../helpers/bem-cn';
import checkOnPattern from '../../../helpers/pattern-check';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Title from '../../Layout/Title/Title';
import Input from '../../inputs/Input';
import Radio from '../../inputs/Radio/Radio';
import Label from '../../labels/Label';
import Hint from '../../labels/Hint/Hint';
import SimpleSelect from '../../selects/SimpleSelect/SimpleSelect';
import MultiSelect from '../../selects/MultiSelect/MultiSelect';
import TagSelect from '../../selects/TagSelect/TagSelect';

import Button from '../../buttons/Button';
import RenderPlugins from '../../forms/plugins/RenderPlugins';

// import './NewApiForm.css';

const b = block('j-api-form');
const row = block('j-row');
const col = block('j-col');
const grid = block('j-grid');

const propTypes = {
    schema: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    // initialValues: PropTypes.object,
};

const OAuthServerForm = props => {
    const {
        handleSubmit,
        schema,

        apiSchema,
        includePlugin,
        removePlugin,
        initialValues,
        plugins,
        excludePlugin,
        selectPlugin,
        selectedPlugins,
    } = props;
    const parse = value => value && parseInt(value);
    const optionsTransformer = config => config.map(item => ({
        label: item,
        value: item,
    }));
    const createOptions = (list1, list2) => {
        const combinedListOfUnitsAndLabels = R.zip(list1, list2);

        return combinedListOfUnitsAndLabels.map(item => ({
            label: item[1],
            value: item[0],
        }));
    };

    return (
        <form className={b} onSubmit={handleSubmit}>
            <Section>
                <Row>
                    <Title>Create New oAuth Server</Title>
                </Row>
            </Section>
            <div className={b('inner')}>
                <div className={b('section')}>
                    <div className={b('section-title')}>1. General</div>
                    <Row className={b('row')()} fullwidth>
                        <Row col>
                            <Label>oAuth Server Name</Label>
                            <Field
                                name="name"
                                type="text"
                                component={Input}
                            />
                            <Hint>Must be unique</Hint>
                        </Row>
                    </Row>
                </div>
                <div className={b('section')}>
                    <div className={b('section-title')}>2. Cors meta</div>
                    <Row className={b('row')()} fullwidth>
                        <Row col>
                            <Label>Is Enabled?</Label>
                            <Row className={b('radio-wrap')()}>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="cors_meta.enabled"
                                        component={Radio}
                                        value={'true'}
                                        type="radio"
                                        id="is-active"
                                    />
                                    <Label htmlFor="is-active">Yes</Label>
                                </Row>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="cors_meta.enabled"
                                        component={Radio}
                                        value={'false'}
                                        type="radio"
                                        id="is-not-active"
                                    />
                                    <Label htmlFor="is-not-active">No</Label>
                                </Row>
                            </Row>
                        </Row>
                    </Row>
                    <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                        <div className={row('item')}>
                            <div className={col()}>
                                <Label>Domains</Label>
                                <Field
                                    name="cors_meta.domains"
                                    type="text"
                                    placeholder={PLACEHOLDER.DOMAINS}
                                    component={Input}
                                />
                                <Hint>A list of all domains from which the endpoint will accept requests</Hint>
                            </div>
                        </div>
                        <div className={row('item')}>
                            <div className={col()}>
                                <Label>Methods</Label>
                                <Field
                                    name="cors_meta.methods"
                                    type="text"
                                    edit={false}
                                    value="cors_meta.methods"
                                    options={optionsTransformer(schema.cors_meta.methods)}
                                    component={MultiSelect}
                                />
                                <Hint>HTTP methods that are supported for the endpoint.</Hint>
                            </div>
                        </div>
                    </div>
                    <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                        <div className={row('item')}>
                            <div className={col()}>
                                <Label>Request Headers</Label>
                                <Field
                                    name="cors_meta.request_headers"
                                    type="text"
                                    edit={false}
                                    value="cors_meta.request_headers"
                                    placeholder={PLACEHOLDER.REQUEST_HEADERS}
                                    options={optionsTransformer(schema.cors_meta.request_headers)}
                                    component={TagSelect}
                                />
                                <Hint>Value(s) for the Access-Control-Allow-Headers header.</Hint>
                            </div>
                        </div>
                        <div className={row('item')}>
                            <div className={col()}>
                                <Label>Exposed Headers</Label>
                                <Field
                                    name="cors_meta.exposed_headers"
                                    type="text"
                                    edit={false}
                                    value="cors_meta.exposed_headers"
                                    placeholder={PLACEHOLDER.EXPOSED_HEADERS}
                                    options={optionsTransformer(schema.cors_meta.exposed_headers)}
                                    component={TagSelect}
                                />
                                <Hint>Value for the Access-Control-Expose-Headers header.</Hint>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={b('section')}>
                    <div className={b('section-title')}>3. Rate limit</div>
                    <div className={row({fullwidth: true}).mix('j-api-form__row')}>
                        <div className={row('item').mix(grid('row', { 2: true }))}>
                            <div className={col()}>
                                <Label>Limit Value</Label>
                                <Field
                                    type="number"
                                    name="rate_limit.limit.value"
                                    placeholder=""
                                    component={Input}
                                />
                            </div>
                            <div className={col()}>
                                <Label>Limit Unit</Label>
                                <Field
                                    name="rate_limit.limit.unit"
                                    type="text"
                                    searchable={false}
                                    clearable={false}
                                    options={createOptions(schema.rate_limit.limit.units, schema.rate_limit.limit.labels)}
                                    component={SimpleSelect}
                                />
                            </div>
                        </div>
                        <div className={row('item')}>
                            <Label>Is Enabled?</Label>
                            <Row className={b('radio-wrap')()}>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="rate_limit.enabled"
                                        component={Radio}
                                        value={'true'}
                                        type="radio"
                                        id="is-active"
                                    />
                                    <Label htmlFor="is-active">Yes</Label>
                                </Row>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="rate_limit.enabled"
                                        component={Radio}
                                        value={'false'}
                                        type="radio"
                                        id="is-not-active"
                                    />
                                    <Label htmlFor="is-not-active">No</Label>
                                </Row>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            <Row className={b('row',{ 'button-row': true })()}>
                <Button
                    type="submit"
                    mod="primary"
                >
                    Create API
                </Button>
            </Row>
        </form>
    );
};

OAuthServerForm.propTypes = propTypes;

const selector = formValueSelector('oAuthServerForm');

const form = reduxForm({
    form: 'oAuthServerForm',
    enableReinitialize: true, // this is needed!!
})(OAuthServerForm);

export default connect(
    // state => {
    //     const plugins = selector(state, 'plugins');

    //     return {
    //         keepDirtyOnReinitialize: false,
    //         plugins,
    //     };
    // },
    null,
    null,
)(form);
