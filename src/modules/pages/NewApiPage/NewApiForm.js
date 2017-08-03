import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import block from '../../../helpers/bem-cn';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Title from '../../Layout/Title/Title';
import Input from '../../inputs/Input';
import Radio from '../../inputs/Radio/Radio';
import Label from '../../labels/Label';
import Hint from '../../labels/Hint/Hint';

import FormRow from '../../forms/FormRow';
import FormInput from '../../forms/FormInput/FormInput';
import FormLabel from '../../forms/FormLabel';
import Button from '../../buttons/Button';
import RenderPlugins from '../../forms/RenderPlugins';

import './NewApiForm.css';

const b = block('j-api-form');

const propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
};

const ApiForm = (props) => {
    const {
        handleSubmit,
        initialValues,
    } = props;
    const parse = value => (value === undefined ? undefined : parseInt(value));

    return (
        <form className={b} onSubmit={handleSubmit}>
            <Section>
                <Row>
                    <Title>Create New API</Title>
                    <Button
                        type="submit"
                        mod="primary"
                    >
                        Create API
                    </Button>
                </Row>
            </Section>
            <div className={b('inner')}>
                <div className={b('section')}>
                    <div className={b('section-title')}>1. General</div>
                    <Row fullwidth>
                        <Row col>
                            <Label>API Name</Label>
                            <Field
                                name="name"
                                type="text"
                                component={Input}
                            />
                            <Hint>Must be unique</Hint>
                        </Row>
                        <Row col>
                            <Label>Is Active?</Label>
                            <Row className={b('radio-wrap')()}>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="active"
                                        component={Radio}
                                        value={'true'}
                                        type="radio"
                                        id="is-active"
                                    />
                                    <Label htmlFor="is-active">Yes</Label>
                                </Row>
                                <Row className={b('radio')()}>
                                    <Field
                                        name="active"
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
                </div>
                <div className={b('section')}>
                    <div className={b('section-title')}>2. Proxy</div>
                    <Row fullwidth>
                        <Row col>
                            <Label>Listen Path</Label>
                            <Field
                                name="proxy.listen_path"
                                type="text"
                                placeholder="eg. http://gw.hellofresh.com/"
                                component={Input}
                            />
                            <Hint>The public url that is exposed by the Gateway</Hint>
                        </Row>
                        <Row col>
                            <Label>Upstream URL</Label>
                            <Field
                                name="proxy.upstream_url"
                                type="text"
                                component={Input}
                            />
                            <Hint>The url to which the Gateway forwards requests made to the public url.</Hint>
                        </Row>
                    </Row>
                </div>
                <div className={b('section')}>
                    <div className={b('section-title')}>3. Health check</div>
                    <Row fullwidth>
                        <Row col>
                            <Label>Health URL (optional)</Label>
                            <Field
                                name="health_check.url"
                                type="text"
                                placeholder="eg. http://gw.hellofresh.com/"
                                component={Input}
                            />
                            <Hint>The url that the Gateway will use to determine the health of the API. </Hint>
                        </Row>
                        <Row col>
                            <Label>Timeout (optional)</Label>
                            <Field
                                name="health_check.timeout"
                                type="number"
                                parse={parse}
                                component={Input}
                            />
                            <Hint>The length of time that the Gateway should wait before displaying an error.</Hint>
                        </Row>
                    </Row>
                </div>

                <FormRow>
                    <Row col>
                        <Label>Preserve Host?</Label>
                        <Row>
                            <Row>
                                <Field
                                    name="proxy.preserve_host"
                                    component={Radio}
                                    value={'true'}
                                    type="radio"
                                    id="preserve-host-true"
                                />
                                <Label htmlFor="preserve-host-true">Yes</Label>
                            </Row>
                            <Row>
                                <Field
                                    name="proxy.preserve_host"
                                    component={Radio}
                                    value={'false'}
                                    type="radio"
                                    id="preserve-host-false"
                                />
                                <Label htmlFor="preserve-host-false">No</Label>
                            </Row>
                        </Row>
                    </Row>
                    {/*<label>
                        <Field
                            name="proxy.preserve_host"
                            component={Radio}
                            value={'true'}
                            type="radio"
                            id="true"
                        />
                        Ja
                    </label>
                    <label>
                        <Field
                            name="proxy.preserve_host"
                            component={Radio}
                            value={'false'}
                            type="radio"
                            id="false"
                        />
                        Nein
                    </label>*/}

                    {/*<FormInput component="input" label="Preserve HOST" attachTo="proxy.preserve_host" type="checkbox" normalize={v => !!v} />*/}
                    <FormInput component="input" label="Strip Path" attachTo="proxy.strip_path" type="checkbox" normalize={v => !!v} />
                    <FormInput component="input" label="Append Path" attachTo="proxy.append_path" type="checkbox" normalize={v => !!v} />
                </FormRow>

                {
                    !!initialValues.plugins &&
                        <RenderPlugins plugins={initialValues.plugins} />
                }

            </div>
        </form>
    );
};

ApiForm.propTypes = propTypes;

const form = reduxForm({
    form: 'apiForm',
    enableReinitialize: true, // this is needed!!
})(ApiForm);

export default connect(
    state => ({
        initialValues: state.apiReducer.api,
    }),
    null,
)(form);
